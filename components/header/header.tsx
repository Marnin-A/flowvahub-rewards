import Notification from "./notifications/notification";

export default function Header() {
	return (
		<header>
			<div className="flex items-center justify-between">
				<h1 className="text-xl md:text-[1.5rem] font-medium">Rewards Hub</h1>
				<Notification />
			</div>
			<p className="text-gray-600">
				Earn points, unlock rewards, and celebrate your progress!
			</p>
		</header>
	);
}
