"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: string;
	error?: string;
	bodyClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
	({ className, label, error, bodyClassName, id, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);
		const inputId = id || props.name;

		return (
			<div className={cn("w-full", bodyClassName)}>
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-medium mb-2 text-[#111827]"
					>
						{label}
					</label>
				)}
				<div className="relative">
					<div className="relative group w-full">
						<input
							type={showPassword ? "text" : "password"}
							id={inputId}
							ref={ref}
							className={cn(
								"peer w-full border py-[11px] px-[14px] text-base border-[#EDE9FE] transition-all ease-linear duration-200 rounded-md outline-none focus:border-primary-purple pr-16",
								className,
								error && "border-red-500 focus:border-red-500"
							)}
							{...props}
						/>
						<div
							className={cn(
								"pointer-events-none absolute inset-0 rounded-md peer-focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]",
								error && "peer-focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
							)}
						></div>
					</div>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 border-none text-[#A78BFA] h-fit font-medium text-xs top-0 bottom-0 m-auto hover:text-primary-purple transition-colors"
					>
						{showPassword ? "Hide" : "Show"}
					</button>
				</div>
				{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
			</div>
		);
	}
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
