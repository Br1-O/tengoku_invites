import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismaInstance";
import { authenticateAdmin } from "@/lib/auth/guards";

export const GET = async (req: NextRequest) => {
  // Guard de Autenticación
  const authResult = authenticateAdmin(req);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const encuestas = await client.encuestaSatisfaccion.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ encuestas }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener encuestas:", error);
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
};