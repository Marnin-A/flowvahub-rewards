"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Bell } from "lucide-react";
import NotificationPopup from "./notification-popup";
import { useNotifications } from "@/hooks/use-notifications";

export default function Notification() {
	const { data: notifications = [], isLoading } = useNotifications();
	const [isOpen, setIsOpen] = useState(false);

	const unreadCount = notifications.filter((n) => !n.is_read).length;

	return (
		<div className="relative">
			<Button
				className="relative bg-gray-1 hover:bg-gray-2 w-10 h-10 rounded-full p-0 group"
				onClick={() => setIsOpen(!isOpen)}
				disabled={isLoading}
			>
				<Bell
					width={20}
					height={20}
					fill="black"
					stroke="black"
					className="group-hover:fill-primary-purple group-hover:stroke-primary-purple"
				/>
				{unreadCount > 0 && (
					<div className="absolute right-1 -top-px h-[15px] w-[15px] font-bold flex items-center justify-center text-[9px] rounded-full bg-red-500 text-white">
						{unreadCount > 9 ? "9+" : unreadCount}
					</div>
				)}
			</Button>

			{/* Backdrop */}
			{isOpen && (
				<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
			)}

			{/* Popup */}
			{isOpen && (
				<div className="absolute right-0 top-full mt-2 z-50">
					<NotificationPopup
						notifications={notifications}
						onClose={() => setIsOpen(false)}
					/>
				</div>
			)}
		</div>
	);
}
