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
			<div className="bg-transparent lg:h-[calc(100vh-110px)] [scrollbar-width:none] [-ms-overflow-style:none] overflow-x-hidden">
				<Tabs defaultValue="earn" className="w-full" items={items} />
			</div>
		</main>
	);
}
