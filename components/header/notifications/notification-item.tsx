"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItemProps {
	id: string;
	icon: React.ReactNode;
	iconBgClass?: string;
	title: string;
	description: string;
	timeAgo: string;
	isRead?: boolean;
	onDelete?: (id: string) => void;
	onMarkAsRead?: (id: string) => void;
}

export default function NotificationItem({
	id,
	icon,
	iconBgClass = "bg-orange-100",
	title,
	description,
	timeAgo,
	isRead = false,
	onDelete,
	onMarkAsRead,
}: NotificationItemProps) {
	const [showMenu, setShowMenu] = useState(false);

	const handleDelete = () => {
		onDelete?.(id);
		setShowMenu(false);
	};

	const handleClick = () => {
		if (!isRead) {
			onMarkAsRead?.(id);
		}
	};

	return (
		<div
			className={cn(
				"flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer relative group",
				!isRead && "bg-purple-50/50"
			)}
			onClick={handleClick}
		>
			{/* Icon */}
			<div
				className={cn(
					"w-10 h-10 rounded-full flex items-center justify-center shrink-0",
					iconBgClass
				)}
			>
				{icon}
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<h4 className="text-sm font-semibold text-gray-900 truncate">
					{title}
				</h4>
				<p className="text-sm text-gray-600 truncate">{description}</p>
				<span className="text-xs text-primary-purple font-medium">
					{timeAgo}
				</span>
			</div>

			{/* Menu Button */}
			<div className="relative">
				<button
					className="p-1 hover:bg-gray-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
					onClick={(e) => {
						e.stopPropagation();
						setShowMenu(!showMenu);
					}}
				>
					<MoreHorizontal className="w-5 h-5 text-gray-400" />
				</button>

				{/* Dropdown Menu */}
				{showMenu && (
					<>
						{/* Backdrop to close menu */}
						<div
							className="fixed inset-0 z-10"
							onClick={(e) => {
								e.stopPropagation();
								setShowMenu(false);
							}}
						/>
						<div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[100px]">
							<button
								className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
								onClick={(e) => {
									e.stopPropagation();
									handleDelete();
								}}
							>
								<Trash2 className="w-4 h-4" />
								Delete
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
