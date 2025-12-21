import { Button } from "../ui/button";
import { Bell } from "lucide-react";

export default function Notification() {
	const notificationCount = 5;
	return (
		<Button className="relative bg-gray-1 hover:bg-gray-2 w-10 h-10 rounded-full p-0 group">
			<Bell
				width={20}
				height={20}
				fill="black"
				stroke="black"
				className="group-hover:fill-primary-purple group-hover:stroke-primary-purple"
			/>
			<div className="absolute right-1 -top-px h-[15px] w-[15px] font-bold flex items-center justify-center text-[9px] rounded-full bg-red-500">
				{notificationCount}
			</div>
		</Button>
	);
}
