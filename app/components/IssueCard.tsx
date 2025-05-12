"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { IssueProps } from "../types/issue";

function IssueCard({
  id,
  area,
  description,
  title,
  createdAt,
  hasAnswer,
}: IssueProps) {
  console.log(createdAt);
  const date = new Date(createdAt).toLocaleDateString();
  return (
    <li className="shadow-md border transition-all">
      <Link href="http://localhost:3000/issues/1">
        <div className="flex justify-between items-center p-2 pb-0">
          <p
            className={`font-bold
                ${area === "Programming" && "text-blue-700"}
                ${area === "Accounting" && "text-green-700"}
                ${area === "Cooking" && "text-amber-700"}
                ${area === "Video Edition" && "text-fuchsia-700"}
                ${area === "Graphic Design" && "text-red-700"} 
            `}
          >
            {area}
          </p>
          <div className="">
            {hasAnswer ? (
              <p className="bg-yellow-30 px-3 rounded-full text-black text-sm">
                pending
              </p>
            ) : (
              <p className="bg-green-400 px-3 rounded-full text-black text-sm">
                available
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10 py-2 px-2 ">
          <div className="flex flex-col justify-between ">
            <div className="font-semibold">{title}</div>
            <div>{description}</div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-xs">Created at {date}</div>
            <Button variant="default" size="sm" className="text-xs font-bold">
              {hasAnswer ? "See Answer" : "Write Answer"}
            </Button>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default IssueCard;
