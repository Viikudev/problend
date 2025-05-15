"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { IssueProps } from "../types/issue";
import { useState } from "react";

function IssueCard({ id, area, title, createdAt, hasAnswer,status }: IssueProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <li 
      className={`flex flex-col justify-between border transition-all duration-300 ${
        isHovered ? "shadow-md shadow-gray-300" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateX(1.5px)" : "translateX(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
    >
      <div className='flex justify-between items-start p-2 pb-0'>
        <div>
          <p
            className={`font-bold
                ${area === "Programming" && "text-blue-700"}
                ${area === "Accounting" && "text-green-700"}
                ${area === "Cooking" && "text-amber-700"}
                ${area === "Video_Edition" && "text-fuchsia-700"}
                ${area === "Graphic_Design" && "text-red-700"} 
                ${area === "Languages" && "text-sky-700"} 
            `}
          >
            {area.replace("_", " ")}
          </p>
          <p className='font-semibold'>{title}</p>
        </div>
        <div className='font-medium'>
          {hasAnswer ? (
            <p className="bg-yellow-300 px-3 rounded-full text-white text-sm">
             provisional
            </p>
          ) : (
            <p className={`px-3 rounded-full text-white text-sm ${
              status === 'active' ? 'bg-green-600' : 'bg-yellow-500'
            }`}>
               {status === "resolved" ? 'Resolved' : status === "active" ? 'Active' : 'Estado'}
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-10 py-2 px-2'>
        <div className='flex flex-col justify-between'></div>
        <div className='flex justify-between items-end'>
          <div className='text-xs'>Created at {date}</div>
          <Link href={`/issues/${id}`}>
            <Button 
              variant='default' 
              className={`text-xs font-bold transition-all duration-200 ${
                isButtonHovered ? "scale-105" : "scale-100"
              }`}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              {hasAnswer ? "See Answer" : "Write Answer"}
            </Button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default IssueCard;