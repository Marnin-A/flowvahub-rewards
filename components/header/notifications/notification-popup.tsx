"use client";

import { Flame, CheckCircle, Users, Gift, Bell } from "lucide-react";
import NotificationHeader from "./notification-header";
import NotificationItem from "./notification-item";
import { EmptyNotifications } from "@/components/ui/empty-state";
import {
	useMarkNotificationAsRead,
	useMarkAllNotificationsAsRead,
	useDeleteNotification,
	useDeleteAllNotifications,
} from "@/hooks/use-notifications";
import type { Notification } from "@/types/database";

// Icon components for different notification types
const NotificationIcons: Record<string, React.ReactNode> = {
	streak: <Flame className="w-5 h-5 text-orange-500" fill="currentColor" />,
	welcome: <CheckCircle className="w-5 h-5 text-green-500" fill="currentColor" />,
	referral: <Users className="w-5 h-5 text-blue-500" />,
	reward: <Gift className="w-5 h-5 text-yellow-500" fill="currentColor" />,
	system: <Bell className="w-5 h-5 text-gray-500" />,
};

const IconBgClasses: Record<string, string> = {
	streak: "bg-orange-100",
	welcome: "bg-green-100",
	referral: "bg-blue-100",
	reward: "bg-yellow-100",
	system: "bg-gray-100",
};

function formatTimeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return "Just now";
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays < 7) return `${diffDays}d ago`;
	return date.toLocaleDateString();
}

interface NotificationPopupProps {
	notifications: Notification[];
	onClose?: () => void;
}

export default function NotificationPopup({
	notifications,
	onClose,
}: NotificationPopupProps) {
	const markAsRead = useMarkNotificationAsRead();
	const markAllAsRead = useMarkAllNotificationsAsRead();
	const deleteNotification = useDeleteNotification();
	const deleteAll = useDeleteAllNotifications();

	const handleMarkAsRead = (id: string) => {
		markAsRead.mutate(id);
	};

	const handleMarkAllAsRead = () => {
		markAllAsRead.mutate();
	};

	const handleDelete = (id: string) => {
		deleteNotification.mutate(id);
	};

	const handleDeleteAll = () => {
		deleteAll.mutate();
	};

	return (
		<div className="w-[360px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
			<NotificationHeader
				onMarkAllAsRead={handleMarkAllAsRead}
				onDeleteAll={handleDeleteAll}
			/>

			<div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
				{notifications.length === 0 ? (
					<EmptyNotifications />
				) : (
					notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							id={notification.id}
							icon={NotificationIcons[notification.type] || NotificationIcons.system}
							iconBgClass={IconBgClasses[notification.type] || IconBgClasses.system}
							title={notification.title}
							description={notification.description}
							timeAgo={formatTimeAgo(notification.created_at)}
							isRead={notification.is_read}
							onDelete={handleDelete}
							onMarkAsRead={handleMarkAsRead}
						/>
					))
				)}
			</div>
		</div>
	);
}
