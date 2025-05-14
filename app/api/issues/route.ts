
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();


// Función para crear un nuevo "issue"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validar los datos de entrada
    if (
      !body.title ||
      !body.status ||
      !body.area ||
      !body.description ||
      !body.userId
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      )
    }
    // Crear el nuevo "Issue" usando Prisma
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        userId: body.userId,
        description: body.description,
        status: body.status,
        area: body.area,
        imageUrl: body.imageUrl, // Permitir valores nulos
      },
    })
    // Devolver una respuesta JSON con el nuevo "Issue" creado
    return NextResponse.json(newIssue, { status: 201 })
  } catch (error) {
    // Manejar errores, especialmente errores de validación o de base de datos
    console.error("Error al crear ISSUE:", error)
    return NextResponse.json({ error: "Error al crear ISSUE" }, { status: 500 })
  }
}

// Función para obtener todos los "issues"
export async function GET() {
  try {
    // Obtener todos los "Issues" usando Prisma
    const issues = await prisma.issue.findMany({
      include: {
        User: true, // Incluir la información del usuario relacionado
        Answer: true, // Incluir las respuestas relacionadas
      },
    })

    // Devolver una respuesta JSON con todos los "Issues"
    return NextResponse.json(issues, { status: 200 })
  } catch (error: any) {
    // Manejar errores
    console.error("Error al obtener los ISSUES:", error)
    return NextResponse.json(
      { error: "Error al obtener los ISSUES: " + error.message },
      { status: 500 }
    )
  }
}
