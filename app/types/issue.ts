export type IssueProps = {
  id: string
  clerkId: string
  title: string
  description: string
  imageUrl?: string
  area: keyof typeof areas
  createdAt: Date
  status:  keyof typeof status
  hasAnswer: boolean
}

export const areas = {
  Programming: "Programming",
  Cooking: "Cooking",
  Electronics: "Electronics",
  Languages: "Languages",
  Video_Edition: "Video Edition",
  Accounting: "Accounting",
  Mechanics: "Mechanics",
  Graphic_Design: "Graphic Design",
}

export const status = {
  resolved: "resolved",
  active: "active",
}
