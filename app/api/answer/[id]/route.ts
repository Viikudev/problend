import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const answer = await prisma.answer.findUnique({
      where: { issueId: id },
    });

    if (!answer) {
      return NextResponse.json({ error: 'Aswer no encontrado' }, { status: 404 });
    }

    return NextResponse.json(answer, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener el ISSUE:', error);
    return NextResponse.json({ error: 'Error al obtener el ISSUE: ' + error.message }, { status: 500 });
  }
}

