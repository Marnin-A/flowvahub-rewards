import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

const robotoSerif = Roboto_Serif({
	variable: "--font-roboto-serif",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Flowva – Discover, Manage & Share Top Tools",
	description:
		"Discover the best tools, earn exclusive rewards, and grow with a thriving community. Join Flowva and get rewarded when your friends sign up!",
	keywords: [
		"Flowva",
		"Flowva Rewards",
		"Flowva Tools",
		"Flowva Community",
		"Flowva Rewards Program",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${robotoSerif.variable} antialiased bg-gray-50`}>
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	);
}
