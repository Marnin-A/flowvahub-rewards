'use client';

import { Check } from 'lucide-react';
import Header2 from '../../ui/header-2';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useReferralStats, useReferralLink } from '@/hooks/use-referrals';
import { ReferralSkeleton } from '@/components/ui/skeletons';
import { ErrorState } from '@/components/ui/error-state';

export default function ReferAndEarn() {
  const [copied, setCopied] = useState(false);
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useReferralStats();
  const { data: referralLink, isLoading: linkLoading, error: linkError, refetch: refetchLink } = useReferralLink();

  const isLoading = statsLoading || linkLoading;
  const error = statsError || linkError;

  if (isLoading) {
    return (
      <div>
        <Header2 title="Refer & Earn" />
        <ReferralSkeleton />
      </div>
    );
  }

  if (error || !stats || !referralLink) {
    return (
      <div>
        <Header2 title="Refer & Earn" />
        <ErrorState
          message="Could not load referral data"
          onRetry={() => {
            refetchStats();
            refetchLink();
          }}
        />
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <Header2 title="Refer & Earn" />
      <div className="shadow-[0_5px_15px_rgba(0,0,0,0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-[#f3f4f6] overflow-hidden transition-shadow duration-200 mt-6">
        {/* Header Section */}
        <div className="p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
          <div className="flex items-center gap-3">
            <Image src="/icons/users.svg" alt="users" width={24} height={24} />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Share Your Link</h3>
              <p className="text-gray-500 text-sm">Invite friends and earn 25 points when they join!</p>
            </div>
          </div>
        </div>
        {/* Body Section */}
        <div className="p-4">
          <div className="space-y-6">
            <div className="flex justify-between py-2 mb-4">
              <div className="text-center p-2 flex-1">
                <div className="text-2xl font-semibold text-primary-purple">{stats.referral_count}</div>
                <div className="text-gray-600">Referrals</div>
              </div>
              <div className="text-center p-2 flex-1">
                <div className="text-2xl font-semibold text-primary-purple">{stats.points_earned_from_referrals}</div>
                <div className="text-gray-600">Points Earned</div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm mb-2 text-gray-700">Your personal referral link:</p>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full pr-10"
                  value={referralLink}
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  {copied ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <Image src="/icons/copy.svg" alt="copy" width={24} height={24} />
                  )}
                </button>
              </div>
            </div>
            {/* Footer | Social Media */}
            <div className="flex justify-center gap-4 mt-4">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                className="rounded-full flex items-center justify-center w-[30px] h-[30px]"
                style={{ backgroundColor: 'rgb(24, 119, 242)' }}
                target="_blank"
              >
                <Image src="/icons/facebook.svg" alt="facebook" width={12} height={18} />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  referralLink
                )}&text=${encodeURIComponent('Join me on Flowva and earn rewards!')}`}
                className="rounded-full flex items-center justify-center w-[30px] h-[30px]"
                style={{ backgroundColor: '#000' }}
                target="_blank"
              >
                <Image src="/icons/twitter.svg" alt="twitter" width={18} height={18} />
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
                className="rounded-full flex items-center justify-center w-[30px] h-[30px]"
                style={{ backgroundColor: 'rgb(0, 119, 181)' }}
                target="_blank"
              >
                <Image src="/icons/linkedin.svg" alt="linkedin" width={18} height={18} />
              </Link>
              <Link
                href={`https://wa.me/?text=${encodeURIComponent('Join me on Flowva! ' + referralLink)}`}
                className="rounded-full flex items-center justify-center w-[30px] h-[30px]"
                style={{ backgroundColor: 'rgb(37, 211, 102)' }}
                target="_blank"
              >
                <Image src="/icons/whatsapp.svg" alt="whatsapp" width={15.75} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
