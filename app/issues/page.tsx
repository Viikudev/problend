"use client"

import React from "react"
import IssueCard from "../components/IssueCard"
import { useState, useEffect } from "react"
import { IssueProps } from "../types/issue"
import axios from "axios"

function Page() {
  const [issues, setIssues] = useState<IssueProps[]>([])

  useEffect(() => {
    const getIssues = async () => {
      const currentOrigin = window.location.origin;
      const response = await axios.get(`${currentOrigin}/api/issues`)
      setIssues(response.data)
    }
    getIssues()
  }, [])

  return (
    <>
      <main className='px-10'>
        <ul className='grid xl:grid-cols-[repeat(4,minmax(10rem,1fr))] lg:max-xl:grid-cols-[repeat(3,minmax(10rem,1fr))] md:max-lg:grid-cols-[repeat(2,minmax(10rem,1fr))] max-md:grid-cols-[repeat(1,minmax(10rem,1fr))] gap-10 justify-center'>
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
