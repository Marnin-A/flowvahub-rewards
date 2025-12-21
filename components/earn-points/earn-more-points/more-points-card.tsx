import React from "react";

export default function MorePointsCard({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="transition-all hover:border-[#9013fe] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] ease-linear duration-200 border border-[#e5e7eb] rounded-xl overflow-hidden">
			{children}
		</div>
	);
}
