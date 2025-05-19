"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { AnswerProps } from "@/app/types/answer";
import { IssueProps } from "@/app/types/issue";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function Issue() {
  const [issue, setIssue] = useState<IssueProps | null>(null);
  const [answer, setAnswer] = useState<AnswerProps | null>(null);
  const [textareaValue, setTextareaValue] = useState("");

  const params = useParams();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/issues/${params.issueId}`);
      setIssue(response.data);
    };
    fetchData();
  }, []);

  const handleTextareaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      try {
        const newAnswer = {
          userId: user.id,
          issueId: params.issueId,
          content: textareaValue,
        };
        const response = await axios.post("/api/answer", newAnswer);

        if (response.status === 200 || response.status === 201) {
          const message = encodeURIComponent("answer created successfully");
          window.location.assign(`/issues?message=${message}`);
        } else if (response.status === 450) {
          const message = encodeURIComponent("answer already resolved");
          window.location.assign(`/issues?message=${message}`);
          console.error("Answer creation failed:", response);
        }
      } catch (error) {
        console.log("Error creating answer:", error);
      }
    }
  };

  if (!issue) {
    return (
      <div className="flex gap-6 min-h-[75vh] justify-center items-center">
        <div className="flex gap-10">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-4 w-50" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-100" />
              <Skeleton className="h-4 w-100" />
              <Skeleton className="h-4 w-75" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-75 w-150 rounded-md" />
            <Skeleton className="h-8 w-150 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[75vh] p-4">
      <div className="flex gap-4 w-full max-w-5xl">
        <div className="flex flex-col w-3/5 md:w-1/2 max-h-80 overflow-y-auto pr-2">
          {issue && (
            <div>
              <h2 className="text-lg font-bold">{issue.title}</h2>
              <p>{issue.description}</p>
            </div>
          )}
        </div>
        {issue && issue.status === "pending" ? (
          <div className="flex flex-col gap-2 max-h-90 overflow-y-auto w-1/2">
            {answer && <p>{answer.content}</p>}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 max-h-90 overflow-y-auto w-1/2"
          >
            <Textarea
              placeholder="Write your answer here..."
              id="text"
              className="resize-none h-90"
              onChange={handleTextareaValue}
            />
            <Button type="submit">Send Answer</Button>
          </form>
        )}
      </div>
    </div>
  );
}
