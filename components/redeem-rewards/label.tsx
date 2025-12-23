export default function Label({
	title,
	count,
}: {
	title: string;
	count: number;
}) {
	return (
		<div className="flex items-center gap-1">
			{title}
			<span className="ml-2 text-xs rounded-full h-5 px-2 inline-flex justify-center items-center bg-primary-purple/10 text-primary-purple font-semibold">
				{count}
			</span>
		</div>
	);
}
