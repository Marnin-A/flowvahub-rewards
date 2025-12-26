"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	({ className, type, label, error, id, ...props }, ref) => {
		const inputId = id || props.name;

		return (
			<div className="w-full mb-5">
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-medium mb-2 text-[#111827]"
					>
						{label}
					</label>
				)}
				<div className="relative group w-full">
					<input
						type={type}
						id={inputId}
						ref={ref}
						className={cn(
							"peer w-full border text-base py-[11px] px-3.5 border-[#EDE9FE] transition-all ease-linear duration-200 rounded-md outline-none focus:border-primary-purple",
							error && "border-red-500 focus:border-red-500",
							className
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
				{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
			</div>
		);
	}
);
FormInput.displayName = "FormInput";

export { FormInput };
