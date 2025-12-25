import axios from "axios";
import { createClient } from "@/lib/supabase/client";

// Create a custom Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        const supabase = createClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - session expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const supabase = createClient();
            const { error: refreshError } = await supabase.auth.refreshSession();

            if (!refreshError) {
                // Retry the original request with new token
                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
