import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

// type RouteContext = {
//   params: {
//     id: string;
//   };
// };

export const GET = async (
  request: NextRequest,
  // context: RouteContext
) => {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de issue no proporcionado" },
        { status: 400 }
      );
    }

    const answer = await prisma.answer.findUnique({
      where: { issueId: id },
      include: {
        User: true,
      },
    });

    if (!answer) {
      return NextResponse.json(
        { error: "Answer no encontrado" },
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
  // context: RouteContext
) {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de issue no proporcionado" },
        { status: 400 }
      );
    }

    await prisma.answer.delete({
      where: { issueId: id },
    });

    await prisma.issue.update({
      where: { id: id },
      data: {
        status: "available",
      },
    });

    return NextResponse.json("Answer borrada exitosamente", { status: 200 });
  } catch (error) {
    console.error("Error al borrar la answer:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: "Error al borrar la answer: " + errorMessage },
      { status: 500 }
    );
  }
}
