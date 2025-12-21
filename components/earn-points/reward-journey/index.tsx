import PointsBalance from "./points-balance";
import DailyStreak from "./daily-streak";
import Featured from "./featured";
import Header2 from "../../ui/header-2";

export default function RewardJourney() {
	return (
		<div>
			<Header2 title="Your Rewards Journey" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<PointsBalance />
				<DailyStreak />
				<Featured />
			</div>
		</div>
	);
}
