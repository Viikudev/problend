import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const prisma = new PrismaClient();

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
