// src/app/api/admin/surveys/fetchAll/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/auth/guards";
import client from "@/lib/prismaInstance";

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);

  // Si auth es una instancia de NextResponse, significa que falló (401 o 403)
  if (auth instanceof NextResponse) {
    return auth;
  }

  // Si pasa, auth contiene el JWTPayload
  try {
    const encuestas = await client.encuestaSatisfaccion.findMany(); // Ajustá a tu modelo de Prisma
    return NextResponse.json({ encuestas });
  } catch {
    return NextResponse.json({ error: "Error al obtener encuestas" }, { status: 500 });
  }
}