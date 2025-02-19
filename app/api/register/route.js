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
    try {
      await prisma.inscripcion.create({
        data: { nombre, apellido, edad: parseInt(edad), email, entrada: parseInt(entrada) },
      });
    } catch (dbError) {
      console.error("Error al guardar en la base de datos:", dbError);
      return res.status(500).json({ error: "Error al guardar la inscripción en la base de datos" });
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
      return res.status(500).json({ error: "Error al configurar el servicio de correo" });
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
      return res.status(500).json({ error: "Error al enviar el correo a los organizadores" });
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
      return res.status(500).json({ error: "Error al enviar el correo de confirmación al usuario" });
    }

    return res.status(200).json({ message: "Inscripción exitosa y email enviado" });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
};