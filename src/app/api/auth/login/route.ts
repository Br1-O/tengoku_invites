import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismaInstance";
import { verifyPassword, generateToken } from "@/lib/auth/utils";
import { z } from "zod";

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Usuario o email requerido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { usernameOrEmail, password } = validated.data;

    // Buscar usuario por username o por email
    const user = await client.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        status: "ACTIVE",
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // Actualizar último login
    await client.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generar Token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login exitoso",
      user: {
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role,
      },
    });

    // Configurar Cookie HTTPOnly (Seguridad Máxima)
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 horas
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
};