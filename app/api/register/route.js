import client from "@/lib/prismaInstance";
import nodemailer from "nodemailer";

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
      await client.inscripcion.create({
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
        html: `
          <div style="background-color: #2d3748; padding: 20px; border-radius: 10px; color: white; font-family: 'Arial', sans-serif;">
            <h2 style="font-size: 24px; font-weight: bold; color: #fbbf24;">Nueva inscripción recibida</h2>
            <p style="font-size: 18px; line-height: 1.6;">
              <strong>Nombre:</strong> ${nombre}<br>
              <strong>Apellido:</strong> ${apellido}<br>
              <strong>Edad:</strong> ${edad}<br>
              <strong>Email:</strong> ${email}<br>
              <strong>Entrada:</strong> ${entrada}
            </p>
          </div>
        `
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
        html: `
          <div style="background-color: #2d3748; padding: 20px; border-radius: 10px; color: white; font-family: 'Arial', sans-serif;">
              <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="font-size: 38px; font-weight: bold; color: #fff;">
                      ¡Inscripción exitosa!
                  </h1>
              </div>

              <div style="text-align: center;">
                  <div style="font-size: 24px; font-weight: bold; color: #fbbf24;">
                      Hola ${nombre},
                  </div>
              </div>

              <div style="text-align: center;">
                  <p style="font-size: 24px; font-weight: bold; color: #fbbf24;">
                      Tu inscripción ha sido recibida exitosamente.
                  </p>

                  <p style="font-size: 18px; line-height: 1.6; color: #fbbf24;">
                      Recuerda presentarte con tu entrada.
                  </p>

                  <div style="font-size: 18px; line-height: 1.6;">
                      <p>
                          ¡Gracias por participar en el evento!
                      </p>
                  </div>

                  <div style="text-align: center; margin-bottom: 20px;">
                      <img src="https://i.imgur.com/llrhJUl.png" alt="Promo Poster" style="width: 75vw; max-width: 500px; height: auto; display: block; margin: 0 auto;">
                  </div>
              </div>
          </div>
        `
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