export default function Header2({ title }: { title: string }) {
	return (
		<h2 className="text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold">
			{title}
		</h2>
	);
}
