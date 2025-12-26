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
			<span className="ml-2 text-xs rounded-full h-5 px-2 inline-flex justify-center items-center in-[.ant-tabs-tab-active]:bg-primary-purple/10 in-[.ant-tabs-tab-active]:text-primary-purple bg-gray-1 text-gray-2 font-semibold">
				{count}
			</span>
		</div>
	);
}
