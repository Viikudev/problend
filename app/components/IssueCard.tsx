"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { IssueProps } from "../types/issue"

function IssueCard({ id, area, title, createdAt, hasAnswer }: IssueProps) {
  const date = new Date(createdAt).toLocaleDateString()

  return (
    <li className='flex flex-col justify-between shadow-md border transition-all'>
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
          {/* <p>{description}</p> */}
        </div>
        <div className='font-medium'>
          {hasAnswer ? (
            <p className='bg-yellow-300 px-3 rounded-full text-white text-sm'>
              pending
            </p>
          ) : (
            <p className='bg-green-600 px-3 rounded-full text-white text-sm'>
              available
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-10 py-2 px-2'>
        <div className='flex flex-col justify-between '></div>
        <div className='flex justify-between items-end'>
          <div className='text-xs'>Created at {date}</div>
          <Link href={`http://localhost:3000/issues/${id}`}>
            <Button variant='default' size='sm' className='text-xs font-bold'>
              {hasAnswer ? "See Answer" : "Write Answer"}
            </Button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default IssueCard
