import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
const prisma = new PrismaClient()

// Función para crear un nuevo "answer"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log(body)
    // Validar los datos de entrada
    if (
      !body.issueId ||
      !body.status ||
      !body.userId ||
      !body.content
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      )
    }

    const newAnswer = await prisma.answer.upsert({
        where: {
            issueId: body.issueId
        },
        create: {
            userId: body.userId,
            issueId: body.issueId,
            status: body.status,
            content: body.content,
            imageUrl: body.imageUrl,
        },
        update: {
            status: body.status,
            content: body.content,
            imageUrl: body.imageUrl,
        }
        });
    // Devolver una respuesta JSON con el nuevo "Issue" creado
    return NextResponse.json(newAnswer, { status: 201 })
  } catch (error) {
    // Manejar errores, especialmente errores de validación o de base de datos
    console.error("Error al crear ISSUE:", error)
    return NextResponse.json({ error: "Error al crear ISSUE o ISSUE ya fue respondida" }, { status: 500 })
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
