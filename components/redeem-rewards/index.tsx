import { Tabs, TabsProps } from "antd";
import Header2 from "../ui/header-2";
import RewardsBody from "./rewards-body";
import { rewards } from "@/lib/data";
import Label from "./label";

export default function Index() {
	const unlocked = rewards.filter((reward) => reward.status === "unlocked");
	const locked = rewards.filter((reward) => reward.status === "locked");
	const comingSoon = rewards.filter(
		(reward) => reward.status === "coming-soon"
	);
	const allRewards = rewards;
	const items: TabsProps["items"] = [
		{
			key: "all-rewards",
			label: <Label title="All Rewards" count={allRewards.length} />,
			children: <RewardsBody rewards={allRewards} />,
		},
		{
			key: "unlocked",
			label: <Label title="Unlocked" count={unlocked.length} />,
			children: <RewardsBody rewards={unlocked} />,
		},
		{
			key: "locked",
			label: <Label title="Locked" count={locked.length} />,
			children: <RewardsBody rewards={locked} />,
		},
		{
			key: "coming-soon",
			label: <Label title="Coming Soon" count={comingSoon.length} />,
			children: <RewardsBody rewards={comingSoon} />,
		},
	];
	return (
		<div className="pb-2">
			<Header2 title="Redeem Your Points" />
			<Tabs defaultValue="all-rewards" className="w-full mt-5" items={items} />
		</div>
	);
}
