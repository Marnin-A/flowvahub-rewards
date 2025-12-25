"use client";

import { Suspense } from "react";
import ReferAndEarnContent from "./index";
import { ReferralSkeleton } from "@/components/ui/skeletons";

export default function ReferAndEarnWrapper() {
    return (
        <Suspense fallback={<ReferralSkeleton />}>
            <ReferAndEarnContent />
        </Suspense>
    );
}
