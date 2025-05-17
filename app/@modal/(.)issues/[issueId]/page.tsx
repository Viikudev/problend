"use client";

import Modal from "@/app/components/Modal";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
// import { Label } from "@/app/components/ui/label"
import { useEffect, useState } from "react";
import { IssueProps } from "@/app/types/issue";
import axios from "axios";
import Form from "next/form";

export default function Issue() {
  const [issue, setIssue] = useState<IssueProps | null>(null);

  useEffect(() => {
    const fetchIssueData = async () => {
      const currentOrigin = window.location.origin;
      const response = await axios.get(
        `${currentOrigin}/api/issues/${params.issueId}`
      );
      setIssue(response.data);
    };
    fetchIssueData();
  }, []);
  const params = useParams();

  const sendAnswer = () => {};

  return (
    <Modal>
      <div className="flex gap-4 px-4">
        <div className="flex flex-col w-3/5 md:w-1/2 max-h-80 overflow-y-auto pr-2">
          {/* <h2 className='text-lg font-semibold leading-none'>Modal</h2> */}
          {issue && (
            <div>
              <h2 className="text-lg font-bold">{issue.title}</h2>
              <p>{issue.description}</p>
            </div>
          )}
        </div>
        <Form
          action=""
          className="flex flex-col gap-2 max-h-90 overflow-y-auto w-1/2"
        >
          {/* <Label htmlFor='text'>Your Answer</Label> */}
          <Textarea
            placeholder="Write your answer here..."
            id="text"
            className="resize-none h-90"
          />
          <Button type="submit">Send Answer</Button>
        </Form>
      </div>
    </Modal>
  );
}
