"use client";

import Modal from "@/app/components/Modal";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import { useIssues } from "@/app/store/issuesStore";
import { Loader2 } from "lucide-react";

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
      } finally {
        setIsLoading(!isLoading);
      }
    }
  };
  const issues = useIssues((state) => state.issues);
  const issueData = issues.find((issue) => issue.id === params.issueId);


  return (
    <Modal>
      <div className="flex gap-4 px-4 max-sm:flex-col max-h-90 ">
        <div className="flex flex-col w-3/5 md:w-1/2 max-h-90 max-sm:overflow-y-auto sm:overflow-y-auto pr-2 max-sm:w-full">
          {issueData && (
            <div>
                       <p className="text-sm text-muted-foreground mb-1">
            Submitted by:{" "}
            <span className="font-medium text-orange-600">
              {issueData.User?.firstname}
            </span>
          </p>
              <h3 className="text-lg font-bold">{issueData.title}</h3>
              <p>{issueData.description}</p>
            </div>
          )}
        </div>
        {issueData && issueData.status === "pending" ? (
          <div className="flex flex-col gap-2 max-h-90 overflow-y-auto w-1/2">
                        <p className="text-sm text-muted-foreground mb-1">
              Answered by:{" "}
              <span className="font-medium text-orange-600">
                {issueData.Answer?.User?.firstname}
              </span>
            </p>
            {issueData.Answer && <p>{issueData.Answer.content}</p>}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 max-h-90 overflow-y-auto w-1/2 max-sm:w-full max-sm:max-h-70"
          >
            <Textarea
              placeholder="Write your answer here..."
              id="text"
              className="resize-none h-90"
              onChange={handleTextareaValue}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Send Answer"}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}
