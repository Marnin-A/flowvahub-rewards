"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/form-input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormDivider } from "@/components/ui/form-divider";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import {
	signupSchema,
	validatePassword,
	type SignupFormData,
} from "@/lib/schemas/signup-schema";
import { useState, Suspense } from "react";
import { signUp } from "@/lib/actions/auth";
import { Loader2, CheckCircle, Circle, Check } from "lucide-react";

function PasswordRequirements({ password }: { password: string }) {
	const validations = validatePassword(password);

	return (
		<div className="mt-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
			<p className="text-xs text-gray-600 mb-2 font-medium">
				Password must contain:
			</p>
			<ul className="space-y-1">
				{validations.map((rule) => (
					<li
						key={rule.id}
						className={`flex items-center gap-2 text-xs transition-colors ${rule.isValid ? "text-green-600" : "text-gray-500"
							}`}
					>
						{rule.isValid ? (
							<Check className="w-3 h-3" />
						) : (
							<Circle className="w-3 h-3" />
						)}
						{rule.message}
					</li>
				))}
			</ul>
		</div>
	);
}

function SignupForm() {
	const searchParams = useSearchParams();
	const referralCode = searchParams.get("ref");

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const password = watch("password");

	const onSubmit = async (data: SignupFormData) => {
		setError(null);
		const result = await signUp(
			data.email,
			data.password,
			referralCode || undefined
		);
		if (result?.error) {
			setError(result.error);
		} else if (result?.success) {
			setSuccess(true);
		}
	};

	if (success) {
		return (
			<div className="flex justify-center w-full max-w-[420px]">
				<div className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-[30px] px-[20px] lg:p-[40px] bg-white rounded-[10px] animate-fadeIn h-fit text-center">
					<div className="flex justify-center mb-4">
						<CheckCircle className="w-16 h-16 text-green-500" />
					</div>
					<h1 className="text-2xl text-[#6D28D9] font-semibold mb-[8px]">
						Check your email
					</h1>
					<p className="text-sm text-[#6B7280] mb-6">
						We've sent you a confirmation link. Please check your email to
						verify your account.
					</p>
					<Link
						href="/login"
						className="text-[#9013fe] no-underline font-medium hover:underline"
					>
						Back to login
					</Link>
				</div>
			</div>
		);
	}

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
					{referralCode && (
						<p className="text-xs text-green-600 text-center mt-2 bg-green-50 py-2 rounded-md">
							🎉 You were referred! You'll both earn bonus points.
						</p>
					)}
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

						{/* Real-time password requirements - only show when typing */}
						{password && password.length > 0 && (
							<PasswordRequirements password={password} />
						)}

						<PasswordInput
							label="Confirm Password"
							placeholder="••••••••"
							error={errors.confirmPassword?.message}
							{...register("confirmPassword")}
						/>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full text-base h-[55px] flex justify-center gap-2 items-center p-[11px] text-center bg-[#9013FE] text-white font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Signing up...
								</>
							) : (
								"Sign up Account"
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

// Loading fallback for Suspense
function SignupFormSkeleton() {
	return (
		<div className="flex justify-center w-full max-w-[420px]">
			<div className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-[30px] px-[20px] lg:p-[40px] bg-white rounded-[10px] animate-pulse h-fit">
				<div className="mb-[30px]">
					<div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-56 mx-auto"></div>
				</div>
				<div className="space-y-4">
					<div className="h-12 bg-gray-200 rounded"></div>
					<div className="h-12 bg-gray-200 rounded"></div>
					<div className="h-12 bg-gray-200 rounded"></div>
					<div className="h-14 bg-gray-200 rounded-full"></div>
				</div>
			</div>
		</div>
	);
}

export default function Signup() {
	return (
		<Suspense fallback={<SignupFormSkeleton />}>
			<SignupForm />
		</Suspense>
	);
}
