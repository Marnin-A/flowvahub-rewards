import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-gray-200",
                className
            )}
        />
    );
}

// Points Balance Skeleton
export function PointsBalanceSkeleton() {
    return (
        <div className="bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-4 bg-[#eef2ff] border-b border-[#f3f4f6]">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-28" />
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-[100px] w-[100px] rounded-full" />
                </div>
                <div className="mt-4">
                    <div className="flex justify-between mb-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="h-3 w-56 mt-2" />
                </div>
            </div>
        </div>
    );
}

// Daily Streak Skeleton
export function DailyStreakSkeleton() {
    return (
        <div className="bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-4 bg-[#eef2ff] border-b border-[#f3f4f6]">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-24" />
                </div>
            </div>
            <div className="p-4">
                <Skeleton className="h-10 w-20 mb-2" />
                <div className="flex mt-4 space-x-2 justify-center">
                    {Array(7)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} className="h-10 w-10 rounded-full" />
                        ))}
                </div>
                <Skeleton className="h-4 w-48 mx-auto mt-3" />
                <Skeleton className="h-12 w-full rounded-full mt-3" />
            </div>
        </div>
    );
}

// Referral Section Skeleton
export function ReferralSkeleton() {
    return (
        <div className="bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-4 bg-[#eef2ff] border-b border-[#f3f4f6]">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6" />
                    <div>
                        <Skeleton className="h-5 w-28 mb-1" />
                        <Skeleton className="h-4 w-56" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <div className="text-center flex-1">
                        <Skeleton className="h-8 w-12 mx-auto mb-1" />
                        <Skeleton className="h-4 w-16 mx-auto" />
                    </div>
                    <div className="text-center flex-1">
                        <Skeleton className="h-8 w-12 mx-auto mb-1" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <Skeleton className="h-4 w-36 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} className="h-[30px] w-[30px] rounded-full" />
                        ))}
                </div>
            </div>
        </div>
    );
}

// Notifications Skeleton
export function NotificationsSkeleton() {
    return (
        <div className="w-[320px] md:w-[380px] bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-4 border-b border-gray-100">
                <Skeleton className="h-5 w-24" />
            </div>
            <div className="max-h-[400px] overflow-y-auto">
                {Array(3)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="p-4 border-b border-gray-100">
                            <div className="flex gap-3">
                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <Skeleton className="h-3 w-full mb-1" />
                                    <Skeleton className="h-3 w-3/4" />
                                    <Skeleton className="h-3 w-12 mt-2" />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

// Reward Card Skeleton
export function RewardCardSkeleton() {
    return (
        <div className="bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] p-4">
            <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-3/4" />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>
        </div>
    );
}

// Rewards Grid Skeleton
export function RewardsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
                .fill(0)
                .map((_, i) => (
                    <RewardCardSkeleton key={i} />
                ))}
        </div>
    );
}
