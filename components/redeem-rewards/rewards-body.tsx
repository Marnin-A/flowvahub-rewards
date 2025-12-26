import { Reward } from "@/types/database";
import { EmptyRewards } from "@/components/ui/empty-state";

export default function RewardsBody({ rewards }: { rewards: Reward[] }) {
	if (rewards.length === 0) {
		return <EmptyRewards />;
	}

	return (
		<div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-6">
			{rewards.sort((a, b) => a.title.localeCompare(b.title)).map((reward) => {
				const isUnlocked = reward.status === "unlocked";
				const isComingSoon = reward.status === "coming-soon";

				return (
					<div
						key={reward.id}
						className={`border border-secondary-purple bg-white rounded-[12px] flex flex-col justify-between p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all duration-200 ease-linear hover:translate-y-[-5px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] ${!isUnlocked ? "opacity-[0.7] cursor-not-allowed" : ""
							}`}
					>
						<div className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center m-[0_auto_1rem] text-[1.5rem] text-primary-purple bg-secondary-purple">
							{reward.image}
						</div>
						<h4 className="text-center text-black text-[1.1rem] font-semibold mb-2">
							{reward.title}
						</h4>
						<p className="text-center text-[0.9rem] text-[#2D3748] mb-4">
							{reward.description}
						</p>
						<div className="flex items-center justify-center text-primary-purple font-semibold mb-4">
							⭐ {reward.points_cost.toLocaleString()} pts
						</div>
						<button
							disabled={!isUnlocked}
							className={`w-full font-semibold capitalize p-3 rounded-[8px] transition-all duration-300 ease-in-out text-white  ${isUnlocked
								? "bg-primary-purple hover:bg-[#7c3aed]"
								: isComingSoon
									? "bg-gray-300 text-gray-500"
									: "bg-[#d7e0ed] text-gray-500"
								}`}
						>
							{isUnlocked
								? "Redeem"
								: isComingSoon
									? "Coming Soon"
									: "Locked"}
						</button>
					</div>
				);
			})}
		</div>
	);
}
