import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

const prisma = new PrismaClient()

export async function GET() {
  const issues = await prisma.issue.findMany()
  return NextResponse.json(issues)
}
