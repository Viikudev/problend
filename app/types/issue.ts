export type IssueProps = {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  area: area;
  createdAt: Date;
  issueStatus: "active" | "resolved";
  hasAnswer: boolean;
};

export enum area {
  Programming = "Programming",
  Cooking = "Cooking",
  Electronics = "Electronics",
  Languages = "Languages",
  Video_Edition = "Video Edition",
  Accounting = "Accounting",
  Mechanics = "Mechanics",
  "Graphic Design" = "Graphic Design",
}
