import React from "react";
import JourneyCard from "./journey-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Featured() {
	return (
		<JourneyCard>
			<div className="p-4 bg-[linear-gradient(135deg,#9013FE_0%,#70D6FF_100%)] text-white relative overflow-hidden">
				<span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
					Featured
				</span>
				<div className="flex items-center justify-between mt-6">
					<h3 className="text-[1.25rem] font-bold relative z-2">
						Top Tool Spotlight
					</h3>
					<div className="overflow-hidden relative rounded-full size-10 md:size-16">
						<Image
							src="/images/reclaim.png"
							alt="reclaim"
							width={100}
							height={100}
						/>
					</div>
				</div>
				<p className="text-lg">
					<strong> Reclaim</strong>
				</p>
			</div>
			<div className="p-4">
				<div className="flex justify-start mb-4">
					<div className="w-[24px] h-[24px] animate-pulse bg-[#eef2ff] rounded-[6px] flex items-center justify-center mr-1 shrink-0 text-[#9013fe]">
						<Image
							src="/icons/calendar-2.svg"
							alt="calendar"
							width={24}
							height={24}
							className="w-[24px] h-[24px]"
						/>
					</div>
					<div className="flex-1">
						<h4 className="mb-1 font-semibold text-black">
							Automate and Optimize Your Schedule
						</h4>
						<p className="text-[0.875rem] text-gray-600">
							Reclaim.ai is an AI-powered calendar assistant that automatically
							schedules your tasks, meetings, and breaks to boost productivity.
							Free to try — earn Flowva Points when you sign up!
						</p>
					</div>
				</div>
			</div>
			<div className="px-4 py-[5px] flex justify-between items-center border border-t-[#f3f4f6] border-b-0 border-r-0 border-l-0">
				<Button className="bg-[#9013fe] hover:bg-[#8628da] text-white py-2 px-4 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-0">
					<Image
						src="/icons/user-plus.svg"
						alt="user-plus"
						width={17.5}
						height={14}
						className="w-[17.5px] h-[14px]"
					/>
					Sign up
				</Button>
				<Button className="flex items-center gap-1 bg-[linear-gradient(45deg,#9013FE,#FF8687)] text-white  py-2 px-4 rounded-full font-semibold text-sm">
					<Image
						src="/icons/gift.svg"
						alt="gift"
						width={14}
						height={14}
						className="w-[14px] h-[14px]"
					/>
					Claim 50 pts
				</Button>
			</div>
		</JourneyCard>
	);
}
