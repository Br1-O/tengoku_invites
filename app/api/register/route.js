import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { nombre, apellido, edad, email, entrada } = body;

    // Validaciones básicas
    if (!nombre || !apellido || !edad || !email || !entrada) {
      return Response.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Guardar en MongoDB con Prisma
    const inscripcion = await prisma.inscripcion.create({
      data: { nombre, apellido, edad: parseInt(edad), email, entrada: parseInt(entrada) },
    });

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Correo para organizadores
    await transporter.sendMail({
      from: `"Organización Tengoku Games" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_USER}`,
      subject: "Nueva inscripción",
      text: `Nueva inscripción recibida:\n\nNombre: ${nombre}\nApellido: ${apellido}\nEdad: ${edad}\nEmail: ${email}\nEntrada: ${entrada}`,
    });

    // Correo de confirmación al usuario
    await transporter.sendMail({
      from: `"Organización Tengoku Games" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmación de inscripción",
      text: `Hola ${nombre},\n\nTu inscripción ha sido recibida exitosamente. Recuerda presentarte con tu entrada.`,
    });

    return Response.json({ message: "Inscripción exitosa y email enviado" });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
};