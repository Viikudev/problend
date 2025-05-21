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
import Image from "next/image";

function AcceptAnswer(issueData: IssueProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/answer/${issueData.id}`);
      if (response.status === 200 || response.status === 201) {
        const message = encodeURIComponent("answer deleted successfully");
        window.location.assign(`/myissues?message=${message}`);
      } else {
        const message = encodeURIComponent("answer delete failed");
        window.location.assign(`/myissues?message=${message}`);
        console.error("answer delete failed:", response);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting answer:", error);
    }
  };

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const newIssue = { status: "resolved" };
      const response = await axios.put(`/api/issues/${issueData.id}`, newIssue);
      if (response.status === 200 || response.status === 201) {
        const message = encodeURIComponent("issue resolved successfully");
        window.location.assign(`/myissues?message=${message}`);
      } else {
        const message = encodeURIComponent("issue resolved failed");
        window.location.assign(`/myissues?message=${message}`);
        console.error("issue resolve failed:", response);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error resolving issue:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      ) : (
        <div className="flex flex-col gap-4 items-start text-sm text-muted-foreground">
          Was the answer helpful?
          <div className="flex gap-3 items-center">
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="icon"
              className="hover:scale-105 hover:bg-red-100 transition cursor-pointer p-2 rounded-full"
              title="Reject"
              disabled={isLoading}
            >
              <Image
                src="/delete-icon.svg"
                alt="Reject"
                width={24}
                height={24}
              />
            </Button>

            <Button
              onClick={handleAccept}
              variant="ghost"
              size="icon"
              className="hover:scale-105 hover:bg-green-100 transition cursor-pointer p-2 rounded-full"
              title="Approve"
              disabled={isLoading}
            >
              <Image
                src="/heroicons--hand-thumb-up.svg"
                alt="Approve"
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Issue() {
  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<IssueProps | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const { user } = useUser();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseIssue = await axios.get(`/api/issues/${params.issueId}`);
        setIssue(responseIssue.data);
      } catch (error) {
        console.error("Error fetching issue:", error);
      }
    };
    fetchData();
  }, [params.issueId]);

  const handleTextareaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
          : "error creating answer";

      window.location.assign(`/issues?message=${encodeURIComponent(message)}`);
    } catch (error) {
      console.error("Error creating answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!issue) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-5xl p-6 shadow-md bg-white flex gap-6 h-96">
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
    <div className="flex justify-center items-center h-120 bg-gray-50 px-4">
      <div className="w-full max-w-6xl h-full bg-white p-6 shadow-lg border flex flex-col rounded-md ">
        <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
          {/* Left column - Issue details */}
          <div className="w-full md:w-1/2 pr-4 border-r overflow-y-auto max-h-[80vh] flex flex-col justify-between">
            <div className=" pr-4 border-r overflow-y-auto  flex flex-col ">
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

            {issue.status === "pending" && issue.userId === user?.id && (
              <div className="mt-4">
                <AcceptAnswer {...issue} />
              </div>
            )}
          </div>

          {/* Right column - Answer or Form */}
          <div className="w-full md:w-1/2 overflow-y-auto max-h-[80vh]">
            {issue.status === "pending" && issue.Answer ? (
              <div className="pr-2">
                <p className="text-sm text-muted-foreground mb-1">
                  Answered by:{" "}
                  <span className="font-medium text-orange-600">
                    {issue.Answer.User?.firstname}
                  </span>
                </p>
                <div className="p-4 text-gray-800 whitespace-pre-wrap">
                  {issue.Answer.content}
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 pr-2 h-full"
              >
                <label
                  htmlFor="text"
                  className="text-sm font-medium text-gray-600"
                >
                  Write your answer:
                </label>
                <Textarea
                  id="text"
                  required
                  placeholder="Write your answer here..."
                  className="resize-none flex-1 min-h-[200px]"
                  onChange={handleTextareaValue}
                  value={textareaValue}
                />
                <div className="flex justify-end">
                  {issue?.status === "available" &&
                  issue.userId === user?.id ? (
                    <Button disabled className="w-full">
                      you cannot answer your issues
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Send Answer"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
