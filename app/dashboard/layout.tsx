import Sidebar from '@/components/ui/sidebar';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col md:flex-row min-h-dvh lg:h-screen lg:md:overflow-hidden w-full">
      <Sidebar />
      {children}
    </div>
  );
}
