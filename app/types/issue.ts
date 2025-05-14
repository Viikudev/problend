export type IssueProps = {
  id: string
  clerkId: string
  title: string
  description: string
  imageUrl?: string
  area: area
  createdAt: Date
  issueStatus: "active" | "resolved"
  hasAnswer: boolean
}

export enum area {
  Programming = "Programming",
  Cooking = "Cooking",
  Electronics = "Electronics",
  Languages = "Languages",
  Video_Edition = "Video_Edition",
  Accounting = "Accounting",
  Mechanics = "Mechanics",
  Graphic_Design = "Graphic_Design",
}
