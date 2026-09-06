import { NextResponse } from "next/server";
import client from "@/lib/prismaInstance";
import { hashPassword } from "@/lib/auth/utils";

export async function GET() {
  try {
    const hashedPassword = await hashPassword("");

    const superadmin = await client.user.upsert({
      where: { email: "" },
      update: {},
      create: {
        username: "",
        email: "",
        password: hashedPassword,
        nombre: "",
        apellido: "",
        role: "USER",
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      message: "User creado exitosamente",
      user: superadmin.username,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}