import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const segments = pathname.split("/");
    const id = segments.pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID de issue no proporcionado" },
        { status: 400 }
      );
    }
    const issue = await prisma.issue.findUnique({
      where: { id: id },
      include: {
        Answer: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    });

    if (!issue) {
      return NextResponse.json(
        { error: "ISSUE no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el ISSUE:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: "Error al obtener el ISSUE: " + errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const segments = pathname.split("/");
    const id = segments.pop();

    if (!id) {
      return NextResponse.json(
        { error: "Se requiere el ID del ISSUE" },
        { status: 400 }
      );
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id: id,
      },
    });

    // Verificar si el "Issue" existía y fue eliminado
    if (!deletedIssue) {
      return NextResponse.json(
        { error: "ISSUE no encontrado" },
        { status: 404 }
      );
    }

    // Devolver una respuesta JSON indicando éxito
    return NextResponse.json(
      { message: "ISSUE eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    // Manejar errores
    console.error("Error al eliminar el ISSUE:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: "Error al eliminar el ISSUE: " + errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const segments = pathname.split("/");
    const id = segments.pop();
    const body = await request.json();

    // Validar que el ID esté presente
    if (!id) {
      return NextResponse.json(
        { error: "El ID del ISSUE es obligatorio" },
        { status: 400 }
      );
    }

    // Validar que el body no esté vacío
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No se proporcionó ningún dato para actualizar" },
        { status: 400 }
      );
    }

    type UpdateableIssueFields = {
      title?: string;
      description?: string;
      status?: "available" | "resolved" | "pending";
      area?:
        | "programming"
        | "mechanics"
        | "mathematics"
        | "accounting"
        | "languages"
        | "electronics"
        | "cooking"
        | "videoEdition"
        | "graphicDesign"
        | "economy"
        | "other";
      imageUrl?: string | null;
      hasAnswer?: boolean;
    };

    const camposActualizables = [
      "title",
      "description",
      "status",
      "area",
      "imageUrl",
      "hasAnswer",
    ] as const;
    const actualizaciones: Partial<UpdateableIssueFields> = {};

    for (const campo of camposActualizables) {
      if (campo in body) {
        actualizaciones[campo] = body[campo];
      }
    }

    // Verificar si hay campos válidos para actualizar
    if (Object.keys(actualizaciones).length === 0) {
      return NextResponse.json(
        {
          error: "No se proporcionó ningún campo válido para la actualización",
        },
        { status: 400 }
      );
    }

    // Actualizar el "Issue" por ID usando Prisma
    const updatedIssue = await prisma.issue.update({
      where: {
        id: id,
      },
      data: actualizaciones,
    });

    // Verificar si el "Issue" existía y fue actualizado
    if (!updatedIssue) {
      return NextResponse.json(
        { error: "ISSUE no encontrado" },
        { status: 404 }
      );
    }

    // Devolver una respuesta JSON indicando éxito
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    // Manejar errores
    console.error("Error al actualizar el ISSUE:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: "Error al actualizar el ISSUE: " + errorMessage },
      { status: 500 }
    );
  }
}
