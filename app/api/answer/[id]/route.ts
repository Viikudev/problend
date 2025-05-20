import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const answer = await prisma.answer.findUnique({
      where: { issueId: id },
      include: {
        User: true,
      },
    });

    if (!answer) {
      return NextResponse.json(
        { error: "Aswer no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(answer, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el ISSUE:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: "Error al obtener el ISSUE: " + errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    await prisma.answer.delete({
      where: { issueId: id },
    });

    await prisma.issue.update({
      where: { id: id },
      data: {
        status: "available",
      },
    });

    return NextResponse.json("answer borrada exitosamente", { status: 200 });
  } catch (error) {
    console.error("Error al borrar la answer:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: "Error al borrar la answer: " + errorMessage },
      { status: 500 }
    );
  }
}
