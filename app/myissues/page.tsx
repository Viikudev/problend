"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useIssues } from "../store/issuesStore";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import IssueCard from "../components/IssueCard";
import IssueSkeleton from "../components/IssueSkeleton";
import { ComboboxDemo, ComboboxDemoArea } from "../components/filterMenu";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { AlertDemo } from "../components/alert";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyIssues />
    </Suspense>
  );
}

function MyIssues() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("");

  const { user } = useUser();

  const { issues, loading, fetchIssues } = useIssues(
    useShallow((state) => ({
      issues: state.issues,
      loading: state.loading,
      error: state.error,
      fetchIssues: state.fetchIssues,
    }))
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchIssues();
  }, []);

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

  const renderCreateIssueButton = () => (
    <div>
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
    </div>
  );

  const myIssues = useMemo(() => {
    return user ? issues.filter((issue) => issue.userId === user.id) : [];
  }, [issues, user]);

  const filteredIssues = myIssues.filter((issue) => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && issue.status === "available") ||
      (statusFilter === "resolved" &&
        (issue.status === "resolved" || issue.status === "pending")) ||
      (statusFilter === "myCards" && user && issue.userId === user.id);

    const areaMatch = !areaFilter || issue.area === areaFilter;

    return statusMatch && areaMatch;
  });

  if (loading) return <IssueSkeleton />;

  return (
    <>
      <main className="flex flex-col gap-10 px-10 pb-10">
        <div className="flex flex-wrap gap-6 space-y-2 items-center justify-between">
          {renderFilters()}
          {renderCreateIssueButton()}
        </div>

        {myIssues.length === 0 ? (
          <p>you have no issues created</p>
        ) : (
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
        )}
      </main>

      {message && (
        <div className="fixed bottom-10 right-10 w-64">
          <AlertDemo message={message} />
        </div>
      )}
    </>
  );
}
