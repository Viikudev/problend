"use client"

import Image from "next/image"
import React from "react"
import Link from "next/link"
import IssueCard from "../components/IssueCard"
import { Button } from "../components/ui/button"
import { useState, useEffect } from "react"
import { IssueProps } from "../types/issue"
import axios from "axios"

function Page() {
  const [issues, setIssues] = useState<IssueProps[]>([])

  useEffect(() => {
    const getIssues = async () => {
      const currentOrigin = window.location.origin
      const response = await axios.get(`${currentOrigin}/api/issues`)
      console.log(response.data)
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
              status={issue.status}
              hasAnswer={issue.hasAnswer}
            />
          ))}
        </ul>
        <Link href='/issueform' className='fixed right-10 bottom-20 '>
          <Button
            variant='floating'
            size='lg'
            className='flex items-center cursor-pointer'
          >
            <Image
              src='/issue.svg'
              alt='create issue icon'
              width={30}
              height={30}
            />
            Create Issue
          </Button>
        </Link>
      </main>
    </>
  )
}

export default Page
