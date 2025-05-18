"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import IssueCard from "../components/IssueCard";
import { Button } from "../components/ui/button";
import { IssueProps } from "../types/issue";
import axios from "axios";
import { ComboboxDemo, ComboboxDemoArea } from "../components/FilterMenu";
import { motion, AnimatePresence } from "framer-motion";

import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";

function Page() {
  const { user } = useUser();

  const [issues, setIssues] = useState<IssueProps[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("");

  useEffect(() => {
    const getIssues = async () => {
      const currentOrigin = window.location.origin;
      const response = await axios.get(`${currentOrigin}/api/issues`);
      setIssues(response.data);
    };
    getIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    // Filtrar por estado
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

    // Filtrar por área
    const areaMatch = !areaFilter || issue.area === areaFilter;

    return statusMatch && areaMatch;
  });

  return (
    <>
      <main className="flex flex-col gap-10 px-10">
        <div className="flex flex-wrap gap-2 space-y-2 items-center justify-between">
          <div className="flex gap-4 m-0">
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
    </>
  );
}

export default Page;
