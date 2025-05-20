"use client";

import Modal from "@/app/components/Modal";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useIssues } from "@/app/store/issuesStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { IssueProps } from "@/app/types/issue";

function AcceptAnswer(issueData: IssueProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await axios.delete(`/api/answer/${issueData.id}`);

    if (response.status === 200 || response.status === 201) {
      const message = encodeURIComponent("answer deleted successfully");
      // const url = new URL(window.location.href);
      const decodedMessage = decodeURIComponent(message);
      window.location.assign(`/myissues?message=${decodedMessage}`);
    } else {
      const message = encodeURIComponent("answer delete failed");
      const decodedMessage = decodeURIComponent(message);
      window.location.assign(`/myissues?message=${decodedMessage}`);
      console.error("issue delete failed:", response);
    }
  };

  const handleAccept = async () => {
    setIsLoading(true);
    const newIssue = {
      status: "resolved",
    };
    const response = await axios.put(`/api/issues/${issueData.id}`, newIssue);

    if (response.status === 200 || response.status === 201) {
      const message = encodeURIComponent("issue resolved successfully");
      const decodedMessage = decodeURIComponent(message);
      window.location.assign(`/myissues?message=${decodedMessage}`);
    } else {
      const message = encodeURIComponent("issue resolved failed");
      const decodedMessage = decodeURIComponent(message);
      window.location.assign(`/myissues?message=${decodedMessage}`);
      console.error("issue delete failed:", response);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      ) : (
        <div className="flex flex-col gap-4 items-start text-sm text-muted-foregroundsh">
          Is the answer good?
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
  const [textareaValue, setTextareaValue] = useState("");

  const params = useParams();
  const { user } = useUser();

  const handleTextareaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(!isLoading);

    if (user) {
      try {
        const newAnswer = {
          userId: user.id,
          issueId: params.issueId,
          content: textareaValue,
        };
        const response = await axios.post("/api/answer", newAnswer);

        console.log("response", response.data.status);

        if (response.status === 200 || response.status === 201) {
          const message = encodeURIComponent("answer created successfully");
          const decodedMessage = decodeURIComponent(message);
          window.location.assign(`/issues?message=${decodedMessage}`);
        }
      } catch (error) {
        const message = encodeURIComponent("issue already resolved");
        const decodedMessage = decodeURIComponent(message);
        window.location.assign(`/issues?message=${decodedMessage}`);
        console.log("Error creating answer:", error);
      } finally {
        setIsLoading(!isLoading);
      }
    }
  };
  const issues = useIssues((state) => state.issues);
  const issueData = issues.find((issue) => issue.id === params.issueId);

  return (
    <Modal>
      <div className="flex justify-center flex-col md:flex-row gap-6 flex-1 overflow-hidden h-90">
        {/* Left Column */}
        <div className="flex flex-col flex-1 h-full overflow-hidden md:pr-4 md:border-r">
          <div className=" pr-4 border-r overflow-y-auto  flex flex-col ">
            <p className="text-sm text-muted-foreground mb-1">
              Submitted by:{" "}
              <span className="font-medium text-orange-600">
                {issueData?.User?.firstname}
              </span>
            </p>
            <h1 className="text-2xl font-bold mb-2">{issueData?.title}</h1>
            <p className="text-base text-gray-700 whitespace-pre-wrap">
              {issueData?.description}
            </p>
          </div>

          {issueData?.status === "pending" && issueData.userId === user?.id && (
            <div className="mt-4">
              <AcceptAnswer {...issueData} />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col flex-1 h-full overflow-y-auto">
          {issueData?.status === "pending" && issueData?.Answer ? (
            <div className="pr-2">
              <p className="text-sm text-muted-foreground mb-1">
                Answered by:{" "}
                <span className="font-medium text-orange-600">
                  {issueData.Answer.User?.firstname}
                </span>
              </p>
              <div className="p-4 text-gray-800 whitespace-pre-wrap">
                {issueData.Answer.content}
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
                {issueData?.status === "available" &&
                issueData.userId === user?.id ? (
                  <Button disabled className="w-full">
                    you cannot answer your issues
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="w-full">
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
    </Modal>
  );
}
