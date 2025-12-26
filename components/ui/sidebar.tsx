import Image from 'next/image';

export default function Sidebar() {
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
              <Image src="/icons/home.svg" alt="Home" width={24} height={24} />
              <span className="tracking-wide truncate">Home</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/discover.svg" alt="Discover" width={24} height={24} />
              <span className="tracking-wide truncate">Discover</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/library.svg" alt="Library" width={24} height={24} />
              <span className="tracking-wide truncate">Library</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/tech-stack.svg" alt="Tech Stack" width={24} height={24} />
              <span className="tracking-wide truncate">Tech Stack</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/subscriptions.svg" alt="Subscriptions" width={24} height={24} />
              <span className="tracking-wide truncate">Subscriptions</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-pointer duration-200 transition-all
                bg-[rgba(144,19,254,0.2)] text-[#9013FE]
              "
            >
              <Image src="/icons/rewards.svg" alt="Rewards" width={24} height={24} />
              <span className="tracking-wide truncate">Rewards Hub</span>
            </li>
            <li
              className="
                flex items-center gap-3 px-4 p-3 mb-2 rounded-[8px] cursor-not-allowed opacity-30 duration-200 transition-all
                text-black hover:bg-[rgba(144,19,254,0.1)] hover:text-[#9013FE]
              "
            >
              <Image src="/icons/settings.svg" alt="Settings" width={24} height={24} />
              <span className="tracking-wide truncate">Settings</span>
            </li>
          </ul>
        </nav>
        <div className="mt-auto py-3 relative flex justify-center">
          <div className="absolute top-0 left-4 right-4 border-t border-[#64748B]"></div>
          <div className="w-full flex items-center justify-between px-4">
            <button className="flex items-center border-none">
              <div className="w-[40px] h-[40px] relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center  text-[#9013FE] bg-[#E9D4FF]">
                <Image
                  src="https://lh3.googleusercontent.com/a/ACg8ocJB9xfNLmk82VY8OzRgSgPYuWeO2f4iAdQSlfV25fHqRvF4QRZi=s96-c"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="text-start">
                <span className="text-[0.9rem] font-semibold">Marnin</span>
                <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden max-w-[153px]">
                  msmaudu@gmail.com
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
