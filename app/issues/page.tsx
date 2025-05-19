"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import IssueCard from "../components/IssueCard";
import IssueSkeleton from "../components/IssueSkeleton";
import { Button } from "../components/ui/button";
import { ComboboxDemo, ComboboxDemoArea } from "../components/filterMenu";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDemo } from "../components/alert";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { useShallow } from "zustand/react/shallow";
import { useIssues } from "../store/issuesStore";

function Page() {
  const pathname = usePathname();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("");
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const { issues, loading, error, fetchIssues } = useIssues(
    useShallow((state) => ({
      issues: state.issues,
      loading: state.loading,
      error: state.error,
      fetchIssues: state.fetchIssues,
    }))
  );

  const { user } = useUser();

  useEffect(() => {
    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    let statusMatch = true;
    if (statusFilter === "all") {
      statusMatch = true;
    } else if (statusFilter === "active") {
      statusMatch = issue.status === "available";
    } else if (statusFilter === "resolved") {
      statusMatch = issue.status === "resolved" || issue.status === "pending";
    } else if (statusFilter === "myCards") {
      statusMatch = user ? issue.userId === user.id : false;
    }

    const areaMatch = !areaFilter || issue.area === areaFilter;

    return statusMatch && areaMatch;
  });

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
  } else if (issues.length === 0) {
    return (
      <main className="flex flex-col gap-10 px-10 pb-10">
        <div className="flex flex-wrap gap-6 space-y-2 items-center justify-between">
          <div className="flex flex-wrap gap-4 m-0">
            <ComboboxDemo value={statusFilter} onSelect={setStatusFilter} />
            <ComboboxDemoArea value={areaFilter} onSelect={setAreaFilter} />
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("");
                setAreaFilter("");
              }}
            >
              clear filters
            </Button>
          </div>
          <div>
            <SignedIn>
              <Link href={`/issueForm?from=${encodeURIComponent(pathname)}`}>
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
          </div>
        </div>
        <p>No issues found</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col gap-10 px-10 pb-10">
        <div className="flex flex-wrap gap-6 space-y-2 items-center justify-between">
          <div className="flex flex-wrap gap-4 m-0">
            <ComboboxDemo value={statusFilter} onSelect={setStatusFilter} />
            <ComboboxDemoArea value={areaFilter} onSelect={setAreaFilter} />
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("");
                setAreaFilter("");
              }}
            >
              clear filters
            </Button>
          </div>
          <div>
            <SignedIn>
              <Link href="/issueform">
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
          </div>
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
                <IssueCard
                  id={issue.id}
                  title={issue.title}
                  description={issue.description}
                  area={issue.area}
                  userId={issue.userId}
                  createdAt={issue.createdAt}
                  status={issue.status}
                  hasAnswer={issue.hasAnswer}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </main>
      <div className="fixed bottom-10 right-10 w-64">
        {message && <AlertDemo message={message} />}
      </div>
    </>
  );
}

export default Page;
