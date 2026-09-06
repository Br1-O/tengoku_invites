// lib/guards.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JWTPayload } from "./utils";

export const authenticateAdmin = (req: NextRequest): JWTPayload | NextResponse => {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
  }

  if (payload.role !== "ADMIN" && payload.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Acceso denegado: Permisos insuficientes" }, { status: 403 });
  }

  return payload; // Retorna el payload del usuario autenticado
};