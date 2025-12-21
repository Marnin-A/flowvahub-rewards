import PointsBalance from "./points-balance";
import DailyStreak from "./daily-streak";
import Featured from "./featured";

export default function RewardJourney() {
	return (
		<div>
			<h2 className="text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold">
				Your Rewards Journey
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<PointsBalance />
				<DailyStreak />
				<Featured />
			</div>
		</div>
	);
}
