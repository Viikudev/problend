export type IssueProps = {
  id: string
  clerkId: string
  title: string
  description: string
  imageUrl?: string
  area: keyof typeof areas
  createdAt: Date
  status: keyof typeof status
  hasAnswer: boolean
}

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
}

export const status = {
  resolved: "resolved",
  available: "available",
  pending: "pending",
}
