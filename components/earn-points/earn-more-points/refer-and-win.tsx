import Image from 'next/image';
import MorePointsCard from './more-points-card';

export default function ReferAndWin() {
  return (
    <MorePointsCard>
      <div className="p-4 border border-b-[#f3f4f6] border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(228,144,230,0.1)] text-primary-purple">
          <Image src="/icons/star.svg" alt="star" width={24} height={24} className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-black">Refer and win 10,000 points!</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center font-normal justify-between">
          <div>
            <p className="text-sm text-black">
              Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{' '}
              <span className="text-primary-purple">10,000 points</span>. Friends must complete onboarding to qualify.
            </p>
          </div>
        </div>
      </div>
    </MorePointsCard>
  );
}
