// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json(
    { message: "Sesión cerrada correctamente" },
    { status: 200 }
  );

  // Expira la cookie inmediatamente asignándole maxAge: 0
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
};