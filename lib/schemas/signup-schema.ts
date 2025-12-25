import { z } from "zod";

// Individual password validation rules
export const passwordRules = [
	{
		id: "minLength",
		test: (password: string) => password.length >= 8,
		message: "At least 8 characters",
	},
	{
		id: "lowercase",
		test: (password: string) => /[a-z]/.test(password),
		message: "At least 1 lowercase letter",
	},
	{
		id: "uppercase",
		test: (password: string) => /[A-Z]/.test(password),
		message: "At least 1 uppercase letter",
	},
	{
		id: "digit",
		test: (password: string) => /\d/.test(password),
		message: "At least 1 digit",
	},
	{
		id: "special",
		test: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
		message: "At least 1 special character",
	},
] as const;

// Helper to validate password against all rules
export function validatePassword(password: string) {
	return passwordRules.map((rule) => ({
		...rule,
		isValid: rule.test(password),
	}));
}

// Check if all password rules pass
export function isPasswordValid(password: string) {
	return passwordRules.every((rule) => rule.test(password));
}

// Password schema for backend validation
export const passwordSchema = z
	.string()
	.min(1, "Password is required")
	.refine(
		(password) => isPasswordValid(password),
		"Password does not meet all requirements"
	);

export const signupSchema = z
	.object({
		email: z
			.string()
			.min(1, "Email is required")
			.email("Please enter a valid email address"),
		password: passwordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignupFormData = z.infer<typeof signupSchema>;
