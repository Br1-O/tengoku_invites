import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismaInstance";
import { verifyPassword, generateToken } from "@/lib/auth/utils";
import { z } from "zod";

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { usernameOrEmail, password } = validated.data;

    const user = await client.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        status: "ACTIVE",
      },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // Generar Token con await
    const token = await generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login exitoso",
      user: { username: user.username, role: user.role },
    });

    // Guardar Cookie Segura
    response.cookies.set("auth_token", token, {
      httpOnly: true, // Inaccesible desde JS/XSS
      secure: process.env.NODE_ENV === "production", // HTTPS en Vercel
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 horas
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}