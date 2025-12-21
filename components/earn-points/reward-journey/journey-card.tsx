export default function JourneyCard({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-[#f3f4f6] overflow-hidden duration-200">
			{children}
		</div>
	);
}
