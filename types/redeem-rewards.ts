export interface Reward {
	title: string;
	description: string;
	points: number;
	status: "unlocked" | "locked" | "coming-soon";
	image: string;
}
