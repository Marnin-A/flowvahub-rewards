"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/form-input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormDivider } from "@/components/ui/form-divider";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import { signupSchema, type SignupFormData } from "@/lib/schemas/signup-schema";

export default function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: SignupFormData) => {
		// Handle form submission
		console.log("Form submitted:", data);
	};

	return (
		<div className="flex justify-center w-full max-w-[420px]">
			<div className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-[30px] px-[20px] lg:p-[40px] bg-white rounded-[10px] animate-fadeIn h-fit">
				{/* Header */}
				<div className="mb-[30px]">
					<h1 className="text-2xl text-[#6D28D9] font-semibold mb-[8px] text-center w-full">
						Create Your Account
					</h1>
					<p className="text-sm text-[#6B7280] text-center w-full">
						Sign up to manage your tools
					</p>
				</div>

				{/* Form */}
				<div className="w-full">
					<form
						className="w-full text-[#111827]"
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormInput
							label="Email"
							type="email"
							placeholder="your@email.com"
							error={errors.email?.message}
							{...register("email")}
						/>

						<PasswordInput
							label="Password"
							placeholder="••••••••"
							error={errors.password?.message}
							{...register("password")}
						/>

						<PasswordInput
							label="Confirm Password"
							placeholder="••••••••"
							error={errors.confirmPassword?.message}
							{...register("confirmPassword")}
						/>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full text-base h-[55px] flex justify-center gap-2 items-center p-[11px] text-center bg-[#9013FE] text-white font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? "Signing up..." : "Sign up Account"}
						</button>
					</form>

					{/* Divider */}
					<FormDivider />

					{/* Social Login */}
					<SocialLoginButton provider="google" />

					{/* Footer */}
					<div className="text-center mt-5 text-sm">
						<p className="text-[#6B7280]">
							Already have an account{" "}
							<Link
								href="/login"
								className="text-[#9013fe] no-underline font-medium hover:underline"
							>
								Log In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
