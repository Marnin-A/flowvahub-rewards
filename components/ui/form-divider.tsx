import * as React from "react";
import { cn } from "@/lib/utils";

interface FormDividerProps {
	text?: string;
	className?: string;
}

function FormDivider({ text = "or", className }: FormDividerProps) {
	return (
		<div
			className={cn("relative flex items-center w-full my-[20px]", className)}
		>
			<div className="grow h-px bg-[#EDE9FE]"></div>
			<span className="text-[13px] text-[#A78BFA] font-medium bg-white px-3">
				{text}
			</span>
			<div className="grow h-px bg-[#EDE9FE]"></div>
		</div>
	);
}

export { FormDivider };
