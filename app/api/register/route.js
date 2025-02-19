import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { nombre, apellido, edad, email, entrada } = body;

    // Validaciones básicas
    if (!nombre || !apellido || !edad || !email || !entrada) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios" }),
        { status: 400 }
      );
    }

    // Guardar en MongoDB con Prisma
    try {
      await prisma.inscripcion.create({
        data: { nombre, apellido, edad: parseInt(edad), email, entrada: parseInt(entrada) },
      });
    } catch (dbError) {
      console.error("Error al guardar en la base de datos:", dbError);
      return new Response(
        JSON.stringify({ error: "Error al guardar la inscripción en la base de datos" }),
        { status: 500 }
      );
    }

    // Configurar Nodemailer
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } catch (mailerError) {
      console.error("Error al configurar el transportador de correo:", mailerError);
      return new Response(
        JSON.stringify({ error: "Error al configurar el servicio de correo" }),
        { status: 500 }
      );
    }

    // Correo para organizadores
    try {
      await transporter.sendMail({
        from: `"Organización Tengoku Games" <${process.env.EMAIL_USER}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: "Nueva inscripción",
        text: `Nueva inscripción recibida:\n\nNombre: ${nombre}\nApellido: ${apellido}\nEdad: ${edad}\nEmail: ${email}\nEntrada: ${entrada}`,
      });
    } catch (sendMailError) {
      console.error("Error al enviar el correo para los organizadores:", sendMailError);
      return new Response(
        JSON.stringify({ error: "Error al enviar el correo a los organizadores" }),
        { status: 500 }
      );
    }

    // Correo de confirmación al usuario
    try {
      await transporter.sendMail({
        from: `"Organización Tengoku Games" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Confirmación de inscripción",
        text: `Hola ${nombre},\n\nTu inscripción ha sido recibida exitosamente. Recuerda presentarte con tu entrada.`,
      });
    } catch (sendMailError) {
      console.error("Error al enviar el correo de confirmación:", sendMailError);
      return new Response(
        JSON.stringify({ error: "Error al enviar el correo de confirmación al usuario" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Inscripción exitosa y email enviado" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500 }
    );
  }
};