"use client";

import Modal from "@/app/components/Modal";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IssueProps } from "@/app/types/issue";
import { AnswerProps } from "@/app/types/answer";
import axios from "axios";

export default function Issue() {
  const [issue, setIssue] = useState<IssueProps | null>(null);
  const [answer, setAnswer] = useState<AnswerProps | null>(null);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    const currentOrigin = window.location.origin;
    const fetchData = async () => {
      const issueResponse = await axios.get(
        `${currentOrigin}/api/issues/${params.issueId}`
      );
      setIssue(issueResponse.data);

      if (issueResponse.data.status === "pending") {
        const answerResponse = await axios.get(
          `${currentOrigin}/api/answer/${params.issueId}`
        );
        setAnswer(answerResponse.data);
      }
    };
    fetchData();
  }, []);

  const params = useParams();
  const { user } = useUser();

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
      window.location.assign(`/issues?message=${message}`);
    } else if(response.status === 450){
        const message = encodeURIComponent("answer already resolved");
       window.location.assign(`/issues?message=${message}`);
      console.error("Issue creation failed:", response);
    }
      } catch (error) {
        console.log("Error creating answer:", error);
      }
    }
  };

  return (
    <Modal>
      <div className="flex gap-4 px-4">
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
    </Modal>
  );
}
