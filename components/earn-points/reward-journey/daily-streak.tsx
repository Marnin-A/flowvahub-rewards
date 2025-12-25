"use client";

import JourneyCard from "./journey-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useStreak, useClaimStreak } from "@/hooks/use-streak";
import { DailyStreakSkeleton } from "@/components/ui/skeletons";
import { ErrorState } from "@/components/ui/error-state";
import { Loader2 } from "lucide-react";

export default function DailyStreak() {
	const { data: streakStatus, isLoading, error, refetch } = useStreak();
	const claimStreak = useClaimStreak();

	const daysOfTheWeek = ["M", "T", "W", "T", "F", "S", "S"];
	const today = new Date().getDay();
	const activeDay = today === 0 ? 6 : today - 1;

	if (isLoading) {
		return <DailyStreakSkeleton />;
	}

	if (error || !streakStatus) {
		return (
			<JourneyCard>
				<ErrorState
					message="Could not load streak data"
					onRetry={() => refetch()}
				/>
			</JourneyCard>
		);
	}

	const handleClaim = async () => {
		await claimStreak.mutateAsync();
	};

	return (
		<JourneyCard>
			<div className="p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
				<h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
					<Image
						src="/icons/calendar.svg"
						alt="calendar"
						width={20}
						height={20}
						className="w-5 h-5"
					/>
					Daily Streak
				</h3>
			</div>
			<div className="p-4">
				<div className="font-extrabold text-4xl text-primary-purple mb-2">
					{streakStatus.current_streak} day{streakStatus.current_streak !== 1 ? "s" : ""}
				</div>
				<div className="flex mt-4 space-x-2 justify-center">
					{daysOfTheWeek.map((day, index) => (
						<div
							key={index}
							className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${streakStatus.streak_days[index]
									? "bg-[#9013fe] text-white"
									: "bg-gray-200 text-gray-500"
								} ${index === activeDay ? "ring-2 ring-[#9013fe] ring-offset-2" : ""}`}
						>
							{streakStatus.streak_days[index] ? "✓" : day}
						</div>
					))}
				</div>
				<p className="text-[0.875rem] text-gray-600 text-center mt-3">
					Check in daily to earn +5 points
				</p>
				<Button
					onClick={handleClaim}
					disabled={!streakStatus.can_claim_today || claimStreak.isPending}
					className="mt-3 w-full py-6 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 bg-primary-purple hover:bg-primary-purple text-white hover:shadow-[0_4px_12px_rgba(144,19,254,0.2)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
				>
					{claimStreak.isPending ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							Claiming...
						</>
					) : !streakStatus.can_claim_today ? (
						<>✓ Claimed Today</>
					) : (
						<>
							<Image
								src="/icons/lightning.svg"
								alt="lightning"
								width={20}
								height={20}
								className="w-5 h-5"
							/>
							Claim Today's Points
						</>
					)}
				</Button>
			</div>
		</JourneyCard>
	);
}
