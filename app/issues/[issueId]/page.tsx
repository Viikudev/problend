"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { IssueProps } from "@/app/types/issue";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Issue() {
  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<IssueProps | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const { user } = useUser();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseIssue = await axios.get(`/api/issues/${params.issueId}`);
      setIssue(responseIssue.data);
    };
    fetchData();
  }, []);

  const handleTextareaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     setIsLoading(!isLoading);
    if (!user) return;

    try {
      const newAnswer = {
        userId: user.id,
        issueId: params.issueId,
        content: textareaValue,
      };
      const response = await axios.post("/api/answer", newAnswer);

      const message =
        response.status === 200 || response.status === 201
          ? "answer created successfully"
          : response.status === 450
          ? "answer already resolved"
          : "error creating answer";

      window.location.assign(`/issues?message=${encodeURIComponent(message)}`);
    } catch (error) {
      console.error("Error creating answer:", error);
    }finally {
        setIsLoading(!isLoading);
      }
  };

  if (!issue) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <div className="w-full max-w-5xl p-6 shadow-md bg-white flex gap-6 h-100">
          <div className="flex flex-col gap-4 w-1/2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
<div className="flex justify-center items-center min-h-[80vh] px-4">
  <div className="w-full max-w-5xl h-[80vh] bg-white p-6 shadow-lg border flex flex-col gap-6">
    <div className="flex flex-col md:flex-row gap-6 h-full">
      <div className="w-full md:w-1/2 pr-4 border-r overflow-y-auto">
        <div className="max-h-full pr-2">
          <p className="text-sm text-muted-foreground mb-1">
            Submitted by:{" "}
            <span className="font-medium text-orange-600">
              {issue.User?.firstname}
            </span>
          </p>
          <h1 className="text-2xl font-bold mb-2">{issue.title}</h1>
          <p className="text-base text-gray-700 whitespace-pre-wrap">
            {issue.description}
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 overflow-y-auto">
        {issue.status === "pending" && issue.Answer ? (
          <div className="max-h-full pr-2">
            <p className="text-sm text-muted-foreground mb-1">
              Answered by:{" "}
              <span className="font-medium text-orange-600">
                {issue.Answer.User?.firstname}
              </span>
            </p>
            <div className=" p-4  text-gray-800 whitespace-pre-wrap">
              {issue.Answer.content}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-h-full pr-2"
          >
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-600"
            >
              Write your answer:
            </label>
            <Textarea
              id="text"
              placeholder="Write your answer here..."
              className="resize-none h-100"
              onChange={handleTextareaValue}
              value={textareaValue}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="w-full" >
              {isLoading ? <Loader2 className="animate-spin" /> : "Send Answer"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  </div>
</div>

  );
}
