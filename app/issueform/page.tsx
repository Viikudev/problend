"use client";

import IssueForm from "@/app/components/IssueForm";

export default function IssueFormPage() {
  return (
    <div className="flex justify-center items-center min-h-[75vh]">
      <div className="border p-4 max-md:w-md md:w-lg">
        <IssueForm />
      </div>
    </div>
  );
}
