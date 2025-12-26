"use client";
import { Share2 } from "lucide-react";
import MorePointsCard from "./more-points-card";
import { useState } from "react";
import { Modal } from "antd";
import Image from "next/image";

export default function ShareYourStack() {
	const userStacks = [
		{
			id: 1,
			name: "Stack 1",
			image: "/icons/stack.svg",
			tools: ["React", "HTML", "CSS", "JS"],
		},
		{
			id: 2,
			name: "Stack 2",
			image: "/icons/stack.svg",
			tools: ["React", "HTML", "CSS", "JS"],
		},
		{
			id: 3,
			name: "Stack 3",
			image: "/icons/stack.svg",
			tools: ["React", "HTML", "CSS", "JS"],
		},
	];
	const noStack =
		"You have no stack created yet, go to Tech Stack to create one.";
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<MorePointsCard>
			<div className="p-4 border border-b-[#f3f4f6] border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-3">
				<div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(144,19,254,0.1)] text-primary-purple">
					<Share2 className="text-primary-purple" />
				</div>
				<div>
					<h3 className="font-semibold text-black">Share Your Stack</h3>
					<p className="text-xs text-gray-500">Earn +25 pts</p>
				</div>
			</div>
			<div className="p-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium text-sm text-black">
							Share your tool stack
						</p>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-[#eef2ff] hover:text-white hover:bg-primary-purple group text-primary-purple py-2 px-4 rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center gap-2 border-0"
					>
						<Share2 className="text-primary-purple group-hover:text-white" />
						Share
					</button>
					<Modal
						open={isModalOpen}
						okButtonProps={{ style: { display: "none" } }}
						cancelButtonProps={{ style: { display: "none" } }}
						centered
						width={370}
						onCancel={handleCancel}
					>
						<h2 className="text-2xl font-bold text-black text-center capitalize mb-4">
							Share Your Stack
						</h2>
						<div className="flex items-center justify-center mx-auto bg-secondary-purple rounded-full p-2 w-10 h-10 mb-4">
							<Image
								src="/icons/stack.svg"
								alt="stack"
								height={18}
								width={16}
							/>
						</div>
						<p className="text-sm text-center text-gray-500">{noStack}</p>
					</Modal>
				</div>
			</div>
		</MorePointsCard>
	);
}
