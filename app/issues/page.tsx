"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { motion, AnimatePresence } from "framer-motion";

import IssueCard from "../components/IssueCard";
import IssueSkeleton from "../components/IssueSkeleton";
import { AlertDemo } from "../components/alert";
import { ComboboxDemo, ComboboxDemoArea } from "../components/filterMenu";
import { Button } from "../components/ui/button";

import { useIssues } from "../store/issuesStore";
import { useShallow } from "zustand/react/shallow";

function CreateIssueButton() {
  return (
    <>
      <SignedIn>
        <Link href={"/issueform"}>
          <Button
            variant="floating"
            size="sm"
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/issue.svg"
              alt="create issue icon"
              width={20}
              height={20}
            />
            Create Issue
          </Button>
        </Link>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="floating"
            size="sm"
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/issue.svg"
              alt="create issue icon"
              width={20}
              height={20}
            />
            Create Issue
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const { user } = useUser();
  const [statusFilter, setStatusFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("");

  const { issues, loading, error, fetchIssues } = useIssues(
    useShallow((state) => ({
      issues: state.issues,
      loading: state.loading,
      error: state.error,
      fetchIssues: state.fetchIssues,
    }))
  );

  useEffect(() => {
    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && issue.status === "available") ||
      (statusFilter === "resolved" &&
        (issue.status === "resolved" || issue.status === "pending")) ||
      (statusFilter === "myCards" && user && issue.userId === user.id);

    const areaMatch = !areaFilter || issue.area === areaFilter;

    return statusMatch && areaMatch;
  });

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 m-0">
      <ComboboxDemo value={statusFilter} onSelect={setStatusFilter} />
      <ComboboxDemoArea value={areaFilter} onSelect={setAreaFilter} />
      <Button
        variant="outline"
        onClick={() => {
          setStatusFilter("all");
          setAreaFilter("");
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center gap-4 p-10">
        <div className="text-red-500 text-lg">
          Error loading issues: {error}
        </div>
        <Button onClick={fetchIssues} variant="outline">
          Retry
        </Button>
      </main>
    );
  }

  if (loading) {
    return <IssueSkeleton />;
  }

  if (issues.length === 0) {
    return (
      <main className="flex flex-col gap-10 px-10 pb-10">
        <div className="flex flex-wrap gap-6 space-y-2 items-center justify-between">
          {renderFilters()}
          <CreateIssueButton />
        </div>
        <p>No issues found</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col gap-10 px-10 pb-10">
        <div className="flex flex-wrap gap-6 space-y-2 items-center justify-between">
          {renderFilters()}
          <CreateIssueButton />
        </div>

        <ul className="grid xl:grid-cols-[repeat(4,minmax(10rem,1fr))] lg:max-xl:grid-cols-[repeat(3,minmax(10rem,1fr))] md:max-lg:grid-cols-[repeat(2,minmax(10rem,1fr))] max-md:grid-cols-[repeat(1,minmax(10rem,1fr))] gap-10 justify-center">
          <AnimatePresence mode="wait">
            {filteredIssues.map((issue) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <IssueCard {...issue} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </main>

      {message && (
        <div className="fixed bottom-10 right-10 w-64">
          <AlertDemo message={message} />
        </div>
      )}
    </>
  );
}
