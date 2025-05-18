import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-neutral-300 animate-pulse", className)}
      {...props}
    />
  );
}

export { Skeleton };
