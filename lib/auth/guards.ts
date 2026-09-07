// lib/auth/guards.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JWTPayload } from "./utils";

export const authenticateAdmin = async (
  req: NextRequest
): Promise<JWTPayload | NextResponse> => {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Falta este await para esperar la promesa de jose
  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
  }

  const userRole = payload.role?.toUpperCase();

  if (userRole !== "ADMIN" && userRole !== "SUPERADMIN") {
    return NextResponse.json({ error: "Acceso denegado: Permisos insuficientes" }, { status: 403 });
  }

  return payload;
};