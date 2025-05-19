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
      !body.userId ||
      !body.content
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      )
    }
      const answer= await prisma.answer.findUnique({
        where: {
           issueId: body.issueId,
        },
      })
      if(!answer){    
        const newAnswer = await prisma.answer.create({
        data: {
            userId: body.userId,
            issueId: body.issueId,
            content: body.content,
            imageUrl: body.imageUrl,
        },
        });
          const updateIssue = await prisma.issue.update({
          where: {
             id: body.issueId,
          },
          data: {
            status: 'pending',
          },
        })
        return NextResponse.json(newAnswer, { status: 201 })
      }else{return NextResponse.json({ error: "answer resolved" }, { status: 450 })}


    // Devolver una respuesta JSON con el nuevo "Issue" creado
   
  } catch (error) {
    // Manejar errores, especialmente errores de validación o de base de datos
    console.error("Error al crear answer:", error)
    return NextResponse.json({ error: "Error al crear ansswer" }, { status: 500 })
  }
  
}

