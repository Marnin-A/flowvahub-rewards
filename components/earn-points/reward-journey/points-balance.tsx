"use client";

import Image from "next/image";
import JourneyCard from "./journey-card";
import { useProfile } from "@/hooks/use-profile";
import { PointsBalanceSkeleton } from "@/components/ui/skeletons";
import { ErrorState } from "@/components/ui/error-state";

export default function PointsBalance() {
	const { data: profile, isLoading, error, refetch } = useProfile();

	if (isLoading) {
		return <PointsBalanceSkeleton />;
	}

	if (error || !profile) {
		return (
			<JourneyCard>
				<ErrorState
					message="Could not load points balance"
					onRetry={() => refetch()}
				/>
			</JourneyCard>
		);
	}

	const points = profile.points_balance;
	const targetPoints = 5000;
	const width = Math.min((points / targetPoints) * 100, 100);

	const getProgressMessage = () => {
		if (points === 0) return "🚀 Just getting started — keep earning points!";
		if (points < 1000) return "🌱 You're off to a great start!";
		if (points < 2500) return "⚡ Halfway there — keep it up!";
		if (points < 5000) return "🔥 Almost there — you're doing amazing!";
		return "🎉 You can redeem a reward!";
	};

	return (
		<JourneyCard>
			<div className="p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
				<h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
					<Image
						src="/icons/ribbon.svg"
						alt="coin"
						width={20}
						height={20}
						className="w-5 h-5 text-primary-purple"
					/>
					Points Balance
				</h3>
			</div>
			<div className="p-4">
				<div className="flex justify-between items-center">
					<div className="font-extrabold text-[36px] text-primary-purple m-[10px_0]">
						{points.toLocaleString()}
					</div>
					<div className="lf-player-container">
						<div
							id="lottie"
							className="bg-transparent margin-auto outline-none overflow-hidden h-[100px] w-[100px]"
						>
							<video
								src="/animations/coin.webm"
								autoPlay
								muted
								playsInline
								width={100}
								height={100}
								className="w-full h-full"
							/>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<div className="flex justify-between text-sm mb-1">
						<span className="text-gray-600">
							Progress to <span className="font-medium">$5 Gift Card</span>
						</span>
						<span className="font-medium">{points.toLocaleString()}/5,000</span>
					</div>
					<div className="h-[8px] bg-[#e5e7eb] rounded-[9999px] overflow-hidden">
						<div
							className="h-full bg-linear-to-br from-primary-purple to-[#FF9FF5] rounded-full transition-[width] duration-500 ease-in-out"
							style={{ width: `${width}%` }}
						></div>
					</div>
					<p className="text-xs text-gray-500 mt-2">{getProgressMessage()}</p>
				</div>
			</div>
		</JourneyCard>
	);
}
