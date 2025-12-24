"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Bell } from "lucide-react";
import NotificationPopup, {
	Notification as NotificationType,
} from "./notification-popup";

// Sample notification data - replace with real data from your API
const sampleNotifications: NotificationType[] = [
	{
		id: "1",
		type: "streak",
		title: "Daily Streak Reminder",
		description:
			"Don't forget to claim your streak today and start building your rewards!",
		timeAgo: "1d ago",
		isRead: false,
	},
	{
		id: "2",
		type: "streak",
		title: "Daily Streak Reminder",
		description:
			"Don't forget to claim your streak today and start building your rewards!",
		timeAgo: "2d ago",
		isRead: false,
	},
	{
		id: "3",
		type: "welcome",
		title: "Welcome, Marnin!",
		description:
			"We're thrilled to have you on board! Explore powerful features...",
		timeAgo: "3d ago",
		isRead: true,
	},
];

export default function Notification() {
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] =
		useState<NotificationType[]>(sampleNotifications);

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const handleMarkAsRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
		);
	};

	const handleMarkAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
	};

	const handleDelete = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const handleDeleteAll = () => {
		setNotifications([]);
	};

	return (
		<div className="relative">
			<Button
				className="relative bg-gray-1 hover:bg-gray-2 w-10 h-10 rounded-full p-0 group"
				onClick={() => setIsOpen(!isOpen)}
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
						{unreadCount}
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
						onMarkAsRead={handleMarkAsRead}
						onMarkAllAsRead={handleMarkAllAsRead}
						onDelete={handleDelete}
						onDeleteAll={handleDeleteAll}
						onClose={() => setIsOpen(false)}
					/>
				</div>
			)}
		</div>
	);
}
