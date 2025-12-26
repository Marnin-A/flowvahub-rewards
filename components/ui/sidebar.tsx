'use client';
import Image from 'next/image';
import { useProfile } from '@/hooks/use-profile';
import { Avatar } from 'antd';
import { User } from 'lucide-react';

export default function Sidebar() {
  const { data: profile } = useProfile();
  return (
    <aside className="w-72 overflow-x-hidden flex flex-col h-screen shadow-md border-r border-black/10 text-black font-sans">
      <div className="flex flex-col h-full">
        <div className=" p-2 px-7  my-2 flex justify-start">
          <Image
            src="/images/flowva_logo.png"
            loading="eager"
            alt="Flowva Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[60px] w-auto"
          />
        </div>
        <nav className="grow px-4 ">
          <ul>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/home.svg" alt="Home" width={18} height={16} />
              <span className="tracking-wide truncate">Home</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/discover.svg" alt="Discover" width={16} height={16} />
              <span className="tracking-wide truncate">Discover</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/library.svg" alt="Library" width={20} height={16} />
              <span className="tracking-wide truncate">Library</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/tech-stack.svg" alt="Tech Stack" width={16} height={16} />
              <span className="tracking-wide truncate">Tech Stack</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/subscriptions.svg" alt="Subscriptions" width={18} height={16} />
              <span className="tracking-wide truncate">Subscriptions</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-pointer duration-200 transition-all
                bg-[rgba(144,19,254,0.2)] text-[#9013FE]
              "
            >
              <Image src="/icons/rewards.svg" alt="Rewards" width={18} height={16} />
              <span className="tracking-wide truncate">Rewards Hub</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/settings.svg" alt="Settings" width={20} height={16} />
              <span className="tracking-wide truncate">Settings</span>
            </li>
          </ul>
        </nav>
        <div className="mt-auto py-3 relative flex justify-center">
          <div className="absolute top-0 left-4 right-4 border-t border-[#64748B]"></div>
          <div className="w-full flex items-center justify-between px-4">
            <button className="flex items-center border-none">
              <div className="w-[40px] h-[40px] relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center  text-[#9013FE] bg-[#E9D4FF]">
                <Avatar
                  src={profile?.avatar_url}
                  icon={!profile?.avatar_url ? <User /> : undefined}
                  alt="User avatar"
                  size="large"
                  shape="circle"
                />
              </div>
              <div className="text-start">
                {profile?.full_name ? <span className="text-[0.9rem] font-semibold">{profile?.full_name}</span> : ''}
                {profile?.email ? (
                  <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden max-w-[153px]">
                    {profile?.email}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
