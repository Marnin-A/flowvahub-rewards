"use client";
import JourneyCard from "./journey-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Modal, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

export default function Featured() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleSignUp = () => {
		if (typeof window !== "undefined") {
			window.open("https://go.reclaim.ai/ur9i6g5eznps", "_blank");
		}
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleUpload = (info: UploadChangeParam<UploadFile<any>>) => {
		console.log(info.fileList);
	};
	return (
		<JourneyCard>
			<div className="p-4 bg-[linear-gradient(135deg,#9013FE_0%,#70D6FF_100%)] text-white relative overflow-hidden">
				<span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
					Featured
				</span>
				<div className="flex items-center justify-between mt-6">
					<h3 className="text-[1.25rem] font-bold relative z-2">
						Top Tool Spotlight
					</h3>
					<div className="overflow-hidden relative rounded-full size-10 md:size-16">
						<Image
							src="/images/reclaim.png"
							alt="reclaim"
							width={100}
							height={100}
						/>
					</div>
				</div>
				<p className="text-lg">
					<strong> Reclaim</strong>
				</p>
			</div>
			<div className="p-4">
				<div className="flex justify-start mb-4">
					<div className="w-[24px] h-[24px] animate-pulse bg-[#eef2ff] rounded-[6px] flex items-center justify-center mr-1 shrink-0 text-[#9013fe]">
						<Image
							src="/icons/calendar-2.svg"
							alt="calendar"
							width={24}
							height={24}
							className="w-[24px] h-[24px]"
						/>
					</div>
					<div className="flex-1">
						<h4 className="mb-1 font-semibold text-black">
							Automate and Optimize Your Schedule
						</h4>
						<p className="text-[0.875rem] text-gray-600">
							Reclaim.ai is an AI-powered calendar assistant that automatically
							schedules your tasks, meetings, and breaks to boost productivity.
							Free to try — earn Flowva Points when you sign up!
						</p>
					</div>
				</div>
			</div>
			<div className="px-4 py-[5px] flex justify-between items-center border border-t-[#f3f4f6] border-b-0 border-r-0 border-l-0">
				<Button
					onClick={handleSignUp}
					className="bg-[#9013fe] hover:bg-[#8628da] text-white py-2 px-4 cursor-pointer rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-0"
				>
					<Image
						src="/icons/user-plus.svg"
						alt="user-plus"
						width={17.5}
						height={14}
						className="w-[17.5px] h-[14px]"
					/>
					Sign up
				</Button>
				<Button
					onClick={openModal}
					className="flex items-center gap-1 bg-[linear-gradient(45deg,#9013FE,#FF8687)] cursor-pointer text-white  py-2 px-4 rounded-full font-semibold text-sm"
				>
					<Image
						src="/icons/gift.svg"
						alt="gift"
						width={14}
						height={14}
						className="w-[14px] h-[14px]"
					/>
					Claim 50 pts
				</Button>
			</div>
			<Modal
				open={isModalOpen}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				centered
				width={520}
				onCancel={handleCancel}
			>
				<h2 className="text-2xl font-bold text-black text-center capitalize mb-4">
					Claim your 25 points
				</h2>
				<div className="ant-modal-body">
					<p className="text-[0.9rem] text-gray-3">
						Sign up for Reclaim (free, no payment needed), then fill the form
						below:
					</p>
					<li className="text-[0.9rem] text-gray-3">
						<ul>1️⃣ Enter your Reclaim sign-up email.</ul>
						<ul>
							2️⃣ Upload a screenshot of your Reclaim profile showing your email.
						</ul>
					</li>
					<p className="text-[0.9rem] text-gray-3">
						After verification, you’ll get 25 Flowva Points! 🎉😊
					</p>
					<form className="mt-3">
						<label
							htmlFor="email"
							className="block text-sm font-medium mb-2 text-[#111827]"
						>
							Email used on Reclaim
						</label>
						<div className="relative group w-full mb-5">
							<input
								type="email"
								id="email"
								placeholder="user@example.com"
								className=" peer w-full border text-base py-[10px] px-[14px]  border-[#EDE9FE] transition-all ease-linear duration-200 rounded-md outline-none focus:border-[#9013fe]"
								required
								value=""
							/>
							<div className="pointer-events-none absolute inset-0 rounded-md peer-focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"></div>
						</div>
						<label
							htmlFor="file"
							className="block text-sm mb-2 font-medium text-[#111827]"
						>
							Upload screenshot (mandatory)
						</label>
						<Upload
							name="file"
							accept="image/*"
							maxCount={1}
							beforeUpload={() => false}
							className="w-full"
							onChange={handleUpload}
						>
							<div className="p-2 cursor-pointer hover:bg-[rgba(29,28,28,0.05)] block border border-dashed border-[#e9ecef] rounded-[8px] bg-[#f9f9f9] transition-all duration-200">
								<p className="text-center flex justify-center gap-2">
									<Image
										src="/icons/cloud-download.svg"
										alt="cloud-download"
										width={24}
										height={24}
										className="w-6 h-6"
									/>
									<span className="text-base">Choose file</span>
								</p>
							</div>
						</Upload>
						<div className="flex gap-3 justify-end mt-4">
							<button
								type="button"
								className="p-[0.5rem_1rem] rounded-[8px] font-semibold transition-all duration-200 hover:bg-[#d1d5db] bg-[#e9ecef] text-[#020617]"
							>
								Cancel
							</button>
							<button className="p-[0.5rem_1rem] rounded-[8px] font-semibold transition-all duration-200 bg-[#9103fe] text-white hover:bg-[#FF8687]">
								Submit Claim
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</JourneyCard>
	);
}
