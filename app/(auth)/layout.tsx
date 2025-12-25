export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="font-roboto min-h-dvh flex justify-center py-[20px] px-3 items-center bg-linear-to-br from-[#9013fe] to-[#6D28D9]">
			{children}
		</div>
	);
}
