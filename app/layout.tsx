import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Flowva – Discover, Manage & Share Top Tools',
  description:
    'Discover the best tools, earn exclusive rewards, and grow with a thriving community. Join Flowva and get rewarded when your friends sign up!',
  keywords: ['Flowva', 'Flowva Rewards', 'Flowva Tools', 'Flowva Community', 'Flowva Rewards Program'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased bg-gray-50 flex flex-col md:flex-row min-h-dvh lg:h-screen  lg:md:overflow-hidden w-full`}
      >
        <QueryProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
