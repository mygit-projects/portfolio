import { HeroSkeleton, RestSkeleton } from "@/components/home/HomeSkeletons";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      <HeroSkeleton />
      <RestSkeleton />
    </div>
  );
}
