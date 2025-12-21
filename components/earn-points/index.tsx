import RewardJourney from "./reward-journey";
import EarnMorePoints from "./earn-more-points";
import ReferAndEarn from "./refer-and-earn";

export default function EarnPoints() {
	return (
		<div className="mt-5">
			<RewardJourney />
			<EarnMorePoints />
			<ReferAndEarn />
		</div>
	);
}
