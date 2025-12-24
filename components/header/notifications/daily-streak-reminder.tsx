"use client";

import { Flame } from "lucide-react";

interface DailyStreakReminderProps {
	timeAgo?: string;
	isRead?: boolean;
}

export default function DailyStreakReminder({
	timeAgo = "1d ago",
	isRead = false,
}: DailyStreakReminderProps) {
	return (
		<div
			className={`flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
				!isRead ? "bg-purple-50/50" : ""
			}`}
		>
			{/* Flame Icon */}
			<div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
				<Flame className="w-5 h-5 text-orange-500" fill="currentColor" />
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<h4 className="text-sm font-semibold text-gray-900">
					Daily Streak Reminder
				</h4>
				<p className="text-sm text-gray-600 truncate">
					Don&apos;t forget to claim your streak today and start b...
				</p>
				<span className="text-xs text-primary-purple font-medium">
					{timeAgo}
				</span>
			</div>
		</div>
	);
}
