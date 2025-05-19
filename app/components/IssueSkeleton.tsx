import { Skeleton } from "./ui/skeleton";

export default function IssueSkeleton() {
  return (
    <main className="flex flex-col gap-10 px-10">
      <div className="flex flex-wrap justify-between items-center gap-6">
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-8 w-50 rounded-md" />
          <Skeleton className="h-8 w-50 rounded-md" />
          <Skeleton className="h-8 w-30 rounded-md" />
        </div>
        <div>
          <Skeleton className="h-12 w-30 rounded-md" />
        </div>
      </div>
      <div className="grid gap-10 xl:grid-cols-[repeat(4,minmax(10rem,1fr))] lg:max-xl:grid-cols-[repeat(3,minmax(10rem,1fr))] md:max-lg:grid-cols-[repeat(2,minmax(10rem,1fr))] max-md:grid-cols-[repeat(1,minmax(10rem,1fr))]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 gap-2 border p-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-25 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex justify-between items-end space-y-2">
              <Skeleton className="h-4 w-30" />
              <Skeleton className="h-10 w-[100px] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
