import { AnswerProps } from "./answer";

export type IssueProps = {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  area: keyof typeof areas;
  createdAt: Date;
  status: keyof typeof status;
  hasAnswer: boolean;
  User?: UserProps;
  Answer?: AnswerProps;
};

export const areas = {
  programming: "Programming",
  cooking: "Cooking",
  electronics: "Electronics",
  languages: "Languages",
  videoEdition: "Video Edition",
  accounting: "Accounting",
  mechanics: "Mechanics",
  graphicDesign: "Graphic Design",
  economy: "Economy",
  mathematics: "Mathematics",
  other: "Other",
};

export const status = {
  resolved: "resolved",
  available: "available",
  pending: "pending",
};

export type UserProps = {
  firstname?: string;
  lastname?: string;
};
