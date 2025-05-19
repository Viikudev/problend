"use client";

import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "./ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="flex flex-col w-3/5 h-100">
          <DialogTitle className="sr-only">Modal</DialogTitle>
          <div className="text-neutral-600 text-sm">{children}</div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
