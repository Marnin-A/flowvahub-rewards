import Image from "next/image";

export default function RewardJourney() {
	const points = 0;
	return (
		<div>
			<h2 className="text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold">
				Your Rewards Journey
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<EarnPointsCard>
					<div className="p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
						<h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
							<Image
								src="/icons/ribbon.svg"
								alt="coin"
								width={20}
								height={20}
								className="w-5 h-5 text-primary-purple"
							/>
							Points Balance
						</h3>
					</div>
					<div className="p-[1rem]">
						<div className="flex justify-between items-center">
							<div className="font-extrabold text-[36px] text-[#9013fe] m-[10px_0]">
								{points}
							</div>
							<div className="lf-player-container">
								<div
									id="lottie"
									className="bg-transparent margin-auto outline-none overflow-hidden h-[100px] w-[100px]"
								>
									<Image
										src="/icons/coin.svg"
										alt="coin"
										width={100}
										height={100}
										className="w-[100px] h-[100px]"
									/>
								</div>
							</div>
						</div>
						<div className="mt-4">
							<div className="flex justify-between text-sm mb-1">
								<span className="text-gray-600">
									Progress to <span className="font-medium">$5 Gift Card</span>
								</span>
								<span className="font-medium">{points}/5000</span>
							</div>
							<div className="h-[8px]  bg-[#e5e7eb] rounded-[9999px] overflow-hidden">
								<div className="h-full bg-linear-to-br from-[#9013fe] to-[#FF9FF5] rounded-full transition-[width] duration-500 ease-in-out"></div>
							</div>
							<p className="text-xs text-gray-500 mt-2">
								🚀 Just getting started — keep earning points!
							</p>
						</div>
					</div>
				</EarnPointsCard>
			</div>
		</div>
	);
}

function EarnPointsCard({ children }: { children: React.ReactNode }) {
	return (
		<div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200">
			{children}
		</div>
	);
}
