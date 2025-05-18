"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { IssueProps, areas } from "../types/issue";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";

function IssueCard({
  id,
  area,
  title,
  createdAt,
  hasAnswer,
  status,
}: IssueProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const date = new Date(createdAt).toLocaleDateString();

  const areaLabel = areas[area];
  const areaColorMap: Record<string, string> = {
    programming: "text-blue-700",
    mechanics: "text-gray-700",
    mathematics: "text-cyan-700",
    accounting: "text-green-700",
    languages: "text-blue-700",
    electronics: "text-blue-700",
    cooking: "text-orange-700",
    videoEdition: "text-fuchsia-700",
    graphicDesign: "text-indigo-700",
    economy: "text-lime-700",
    other: "text-zinc-700",
  };

  return (
    <li
      className={`flex flex-col justify-between border transition-all duration-300 `}
    >
      <div className="flex justify-between items-start p-2 pb-0">
        <div>
          <p className={`${areaColorMap[area] || "text-black"} font-bold`}>
            {areaLabel}
          </p>
          <p className="font-semibold">{title}</p>
        </div>
        <div className="font-medium">
          {hasAnswer ? (
            <p className="bg-yellow-300 px-3 rounded-full text-white text-sm">
              provisional
            </p>
          ) : (
            <p
              className={`px-3 rounded-full text-white text-sm ${
                status === "available" ? "bg-green-600" : "bg-yellow-500"
              }`}
            >
              {status === "resolved"
                ? "Resolved"
                : status === "available"
                ? "available"
                : "pending"}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10 py-2 px-2">
        <div className="flex justify-between items-end">
          <div className="text-xs">Created at {date}</div>
          <SignedIn>
            <Link href={`/issues/${id}`}>
              <Button
                variant="default"
                className={`text-xs font-bold transition-all duration-200 ${
                  isButtonHovered ? "scale-105" : "scale-100"
                }`}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {status === "available" ? "Write Answer" : "See Answer"}
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="default"
                className={`text-xs font-bold transition-all duration-200 ${
                  isButtonHovered ? "scale-105" : "scale-100"
                }`}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {status === "available" ? "Write Answer" : "See Answer"}
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </li>
  );
}

export default IssueCard;
