"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/form-input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormDivider } from "@/components/ui/form-divider";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import { z } from "zod";
import { useState } from "react";
import { signIn } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
	const [error, setError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setError(null);
		const result = await signIn(data.email, data.password);
		if (result?.error) {
			setError(result.error);
		}
	};

	return (
		<div className="flex justify-center w-full max-w-[420px]">
			<div className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-[30px] px-[20px] lg:p-[40px] bg-white rounded-[10px] animate-fadeIn h-fit">
				{/* Header */}
				<div className="mb-[30px]">
					<h1 className="text-2xl text-[#6D28D9] font-semibold mb-[8px] text-center w-full">
						Log in to flowva
					</h1>
					<p className="text-sm text-[#6B7280] text-center w-full">
						Log in to receive personalized recommendations
					</p>
				</div>

				{/* Error Message */}
				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-sm text-red-600">{error}</p>
					</div>
				)}

				{/* Form */}
				<div className="w-full">
					<form
						className="w-full text-[#111827]"
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormInput
							label="Email"
							type="email"
							placeholder="user@example.com"
							error={errors.email?.message}
							{...register("email")}
						/>

						<PasswordInput
							label="Password"
							placeholder="••••••••"
							bodyClassName="mb-0"
							error={errors.password?.message}
							{...register("password")}
						/>

						{/* Forgot Password Link */}
						<div className="flex justify-end my-2">
							<Link
								href="/forgot-password"
								className="text-sm text-[#9013fe] no-underline font-medium hover:underline"
							>
								Forgot Password?
							</Link>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full text-base h-[55px] flex justify-center gap-2 items-center p-[11px] text-center bg-[#9013FE] text-white font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Signing in...
								</>
							) : (
								"Sign in"
							)}
						</button>
					</form>

					{/* Divider */}
					<FormDivider />

					{/* Social Login */}
					<SocialLoginButton provider="google" />

					{/* Footer */}
					<div className="text-center mt-5 text-sm">
						<p className="text-[#6B7280]">
							Don't have an account?{" "}
							<Link
								href="/signup"
								className="text-[#9013fe] no-underline font-medium hover:underline"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
