"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { IssueProps, areas } from "../types/issue";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

function IssueCard({
  id,
  area,
  title,
  userId,
  createdAt,
  hasAnswer,
  status,
}: IssueProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const date = new Date(createdAt).toLocaleDateString();

  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const areaLabel = areas[area];
  const areaColorMap: Record<string, string> = {
    programming: "text-blue-700",
    mechanics: "text-gray-700",
    mathematics: "text-cyan-700",
    accounting: "text-green-700",
    languages: "text-blue-700",
    electronics: "text-blue-700",
    cooking: "text-orange-700",
    videoEdition: "text-fuchsia-700",
    graphicDesign: "text-indigo-700",
    economy: "text-lime-700",
    other: "text-zinc-700",
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`/api/issues/${id}`);

      if (response.status === 200 || response.status === 201) {
        const message = encodeURIComponent("issue deleted successfully");
        const decodedMessage = decodeURIComponent(message);
        window.location.assign(`/issues?message=${decodedMessage}`);
      }
    } catch (error) {
      const message = encodeURIComponent("issue delete failed");
      const decodedMessage = decodeURIComponent(message);
      window.location.assign(`/issues?message=${decodedMessage}`);
      console.log("Error creating answer:", error);
    } finally {
      setIsLoading(!isLoading);
    }
  };

  return (
    <li
      className={`flex flex-col h-35 justify-between border transition-all duration-300 `}
    >
      <div className="flex justify-between items-start p-2 pb-0">
        <div>
          <p className={`${areaColorMap[area] || "text-black"} font-bold`}>
            {areaLabel}
          </p>
          <p className="font-semibold">{title}</p>
        </div>
        <div className="font-medium">
          {hasAnswer ? (
            <p className="bg-yellow-300 px-3 rounded-full text-white text-sm">
              provisional
            </p>
          ) : (
            <p
              className={`px-3 rounded-full text-white text-sm ${
                status === "available" ? "bg-green-600" : "bg-yellow-500"
              }`}
            >
              {status === "resolved"
                ? "Resolved"
                : status === "available"
                ? "available"
                : "pending"}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10 py-2 px-2">
        <div className="flex justify-between items-end">
          <div className="text-xs">Created at {date}</div>
          <div className="flex gap-2">
            <SignedIn>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {user && user.id === userId && (
                    <Button
                      variant="ghost"
                      size="delete"
                      className="hover:scale-105 cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Image
                          src="/delete-icon.svg"
                          alt="detele icon"
                          width={30}
                          height={30}
                        />
                      )}
                    </Button>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to delete this issue?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      The card will be permanenently removed and cant be
                      recover.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary">
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      onClick={handleDelete}
                      className="bg-destructive"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link href={`/issues/${id}`} className="flex gap-2">
                <Button
                  variant="default"
                  className={`text-xs font-bold transition-all duration-200 ${
                    isButtonHovered ? "scale-105" : "scale-100"
                  }`}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  {status === "available" ? "Write Answer" : "See Answer"}
                </Button>
              </Link>
            </SignedIn>
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="default"
                size="sm"
                className={`text-xs font-bold transition-all duration-200 ${
                  isButtonHovered ? "scale-105" : "scale-100"
                }`}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {status === "available" ? "Write Answer" : "See Answer"}
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </li>
  );
}

export default IssueCard;
