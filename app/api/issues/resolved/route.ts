// Función para obtener todos los "issues"

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Obtener todos los "Issues" usando Prisma
    const resolvedIssues = await prisma.issue.findMany({
      where: {
        status: "resolved", // Filtro fijo aplicado desde el backend
      },
      include: {
        User: true,
        Answer: true,
      },
    });

    // Devolver una respuesta JSON con todos los "Issues"
    return NextResponse.json(resolvedIssues, { status: 200 });
  } catch (error: any) {
    // Manejar errores
    console.error('Error al obtener los ISSUES resueltos:', error);
    return NextResponse.json({ error: 'Error al obtener los ISSUES resueltos: ' + error.message }, { status: 500 });
  }
}