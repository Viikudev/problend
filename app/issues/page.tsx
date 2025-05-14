"use client"

import React from "react"
import IssueCard from "../components/IssueCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { IssueProps } from "../types/issue"

function Page() {
  const [issues, setIssues] = useState<IssueProps[]>([])

  useEffect(() => {
    const getIssues = async () => {
      const response = await axios.get("http://localhost:3000/api/issues")
      setIssues(response.data)
    }
    getIssues()
  }, [])

  return (
    <>
      <main className='px-10'>
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-10 justify-center'>
          {issues.map((issue: IssueProps) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              title={issue.title}
              description={issue.description}
              area={issue.area}
              clerkId={issue.clerkId}
              createdAt={issue.createdAt}
              issueStatus={issue.issueStatus}
              hasAnswer={issue.hasAnswer}
            />
          ))}
        </ul>
      </main>
    </>
  )
}

export default Page
