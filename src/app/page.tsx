import { Suspense } from "react";
import { HomeShell } from "@/components/home/HomeShell";
import { AboveTheFold } from "@/components/home/AboveTheFold";
import { BelowTheFold } from "@/components/home/BelowTheFold";
import { HeroSkeleton, RestSkeleton } from "@/components/home/HomeSkeletons";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <HomeShell>
      <Suspense fallback={<HeroSkeleton />}>
        <AboveTheFold />
      </Suspense>
      <Suspense fallback={<RestSkeleton />}>
        <BelowTheFold />
      </Suspense>
    </HomeShell>
  );
}
