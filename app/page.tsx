import EarnPoints from "@/components/earn-points";
import Header from "@/components/header/header";
import RedeemPoints from "@/components/redeem-rewards";
import { Tabs, TabsProps } from "antd";

export default function Home() {
	const items: TabsProps["items"] = [
		{
			key: "earn",
			label: "Earn Points",
			children: <EarnPoints />,
		},
		{
			key: "redeem",
			label: "Redeem Points",
			children: <RedeemPoints />,
		},
	];

	return (
		<main className="w-full px-4 lg:px-8 lg:pt-8 min-h-screen overflow-y-auto box-border">
			<Header />
			<Tabs defaultValue="earn" className="w-full mt-5" items={items} />
		</main>
	);
}
