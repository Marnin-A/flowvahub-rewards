"use client";

interface NotificationHeaderProps {
	onMarkAllAsRead?: () => void;
	onDeleteAll?: () => void;
}

export default function NotificationHeader({
	onMarkAllAsRead,
	onDeleteAll,
}: NotificationHeaderProps) {
	return (
		<div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-purple-600 to-purple-500 rounded-t-lg">
			<h3 className="text-white font-semibold text-base">Notifications</h3>
			<div className="flex items-center gap-4">
				<button
					className="text-white/90 hover:text-white text-sm font-medium transition-colors"
					onClick={onMarkAllAsRead}
				>
					Mark all as read
				</button>
				<button
					className="text-white/90 hover:text-white text-sm font-medium transition-colors"
					onClick={onDeleteAll}
				>
					Delete All
				</button>
			</div>
		</div>
	);
}
