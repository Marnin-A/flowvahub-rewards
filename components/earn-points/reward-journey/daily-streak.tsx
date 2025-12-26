'use client';

import { useState } from 'react';
import JourneyCard from './journey-card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useStreak, useClaimStreak } from '@/hooks/use-streak';
import { DailyStreakSkeleton } from '@/components/ui/skeletons';
import { ErrorState } from '@/components/ui/error-state';
import { Loader2 } from 'lucide-react';
import { Modal } from 'antd';

export default function DailyStreak() {
  const { data: streakStatus, isLoading, error, refetch } = useStreak();
  const claimStreak = useClaimStreak();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const daysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay();
  const activeDay = today === 0 ? 6 : today - 1;

  if (isLoading) {
    return <DailyStreakSkeleton />;
  }

  if (error || !streakStatus) {
    return (
      <JourneyCard>
        <ErrorState message="Could not load streak data" onRetry={() => refetch()} />
      </JourneyCard>
    );
  }

  const handleClaim = async () => {
    await claimStreak.mutateAsync();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <JourneyCard>
      <div className="p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <Image src="/icons/calendar.svg" alt="calendar" width={20} height={20} className="w-5 h-5" />
          Daily Streak
        </h3>
      </div>
      <div className="p-4">
        <div className="font-extrabold text-4xl text-primary-purple mb-2 h-14 flex items-center">
          {streakStatus.current_streak} day{streakStatus.current_streak !== 1 ? 's' : ''}
        </div>
        <div className="flex mt-4 space-x-2 justify-center">
          {daysOfTheWeek.map((day, index) => (
            <div
              key={index}
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 
				${
          streakStatus.streak_days[index]
            ? 'bg-gray-300 text-gray-500' // 'bg-primary-purple text-white'
            : 'bg-gray-200 text-gray-500'
        } 
				${index === activeDay ? 'ring-2 ring-primary-purple ring-offset-2' : ''}`}
            >
              {
                //   streakStatus.streak_days[index] ? '✓' :
                day
              }
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center mt-3 leading-loose">Check in daily to earn +5 points</p>
        <Button
          onClick={handleClaim}
          disabled={!streakStatus.can_claim_today || claimStreak.isPending}
          className="group mt-3 w-full py-6 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 bg-primary-purple hover:bg-primary-purple text-white hover:shadow-[0_4px_12px_rgba(144,19,254,0.2)] hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-black disabled:hover:translate-y-0"
        >
          {claimStreak.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Claiming...
            </>
          ) : !streakStatus.can_claim_today ? (
            <>
              <Image src="/icons/gray-lightning.svg" alt="lightning" width={20} height={20} className="w-5 h-5" />
              Claimed Today
            </>
          ) : (
            <>
              <Image
                src="/icons/lightning.svg"
                alt="lightning"
                width={20}
                height={20}
                className="w-5 h-5 group-hover:animate-shake-once"
              />
              Claim Today&apos;s Points
            </>
          )}
        </Button>
      </div>

      <Modal open={isModalVisible} footer={null} onCancel={handleCancel} width={370} centered>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-10">
            <canvas
              width="322"
              height="319"
              style={{ zIndex: 2, position: 'absolute', pointerEvents: 'none', inset: '0px' }}
            ></canvas>
          </div>
          <div className="flex justify-center z-20 relative mb-2">
            <div className="w-[98px] h-[98px] text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <h2 className="text-[24px] font-bold text-center text-[#9013fe] mb-[10px]"> Level Up! 🎉</h2>
          <div className="text-[36px] font-extrabold my-[10px] bg-linear-to-br from-[#9013fe] to-[#FF9FF5] text-center  bg-clip-text text-transparent [text-shadow:1px_1px_3px_rgba(0,0,0,0.1)]">
            +5 Points
          </div>
          <div className="flex justify-center space-x-1 mb-1">
            <span className="animate-bounce">✨</span>
            <span className="animate-bounce">💎</span>
            <span className="animate-bounce">🎯</span>
          </div>
          <p className="text-gray-600 text-[15px] text-center leading-[1.6] mb-[25px]">
            You&apos;ve claimed your daily points! Come back tomorrow for more!
          </p>
        </div>
      </Modal>
    </JourneyCard>
  );
}
