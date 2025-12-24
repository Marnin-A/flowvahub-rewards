"use client";

import { Flame, CheckCircle } from "lucide-react";
import NotificationHeader from "./notification-header";
import NotificationItem, { NotificationItemProps } from "./notification-item";

// Icon components for different notification types
const NotificationIcons = {
	streak: <Flame className="w-5 h-5 text-orange-500" fill="currentColor" />,
	welcome: (
		<CheckCircle className="w-5 h-5 text-green-500" fill="currentColor" />
	),
	points: (
		<svg
			className="w-5 h-5 text-purple-500"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
		</svg>
	),
	reward: (
		<svg
			className="w-5 h-5 text-yellow-500"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
		</svg>
	),
};

const IconBgClasses = {
	streak: "bg-orange-100",
	welcome: "bg-green-100",
	points: "bg-purple-100",
	reward: "bg-yellow-100",
};

export type NotificationType = "streak" | "welcome" | "points" | "reward";

export interface Notification {
	id: string;
	type: NotificationType;
	title: string;
	description: string;
	timeAgo: string;
	isRead?: boolean;
}

interface NotificationPopupProps {
	notifications: Notification[];
	onMarkAsRead?: (id: string) => void;
	onMarkAllAsRead?: () => void;
	onDelete?: (id: string) => void;
	onDeleteAll?: () => void;
	onClose?: () => void;
}

export default function NotificationPopup({
	notifications,
	onMarkAsRead,
	onMarkAllAsRead,
	onDelete,
	onDeleteAll,
}: NotificationPopupProps) {
	return (
		<div className="w-[360px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
			<NotificationHeader
				onMarkAllAsRead={onMarkAllAsRead}
				onDeleteAll={onDeleteAll}
			/>

			<div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
				{notifications.length === 0 ? (
					<div className="p-6 text-center text-gray-500">
						<p className="text-sm">No notifications yet</p>
					</div>
				) : (
					notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							id={notification.id}
							icon={NotificationIcons[notification.type]}
							iconBgClass={IconBgClasses[notification.type]}
							title={notification.title}
							description={notification.description}
							timeAgo={notification.timeAgo}
							isRead={notification.isRead}
							onDelete={onDelete}
							onMarkAsRead={onMarkAsRead}
						/>
					))
				)}
			</div>
		</div>
	);
}
