import client from "@/lib/prismaInstance";
import { registerSchema } from "@/lib/validations/register";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    if (!req.body) {
      return new Response(JSON.stringify({ error: "Request body is empty" }), { status: 400 });
    }

    const body = await req.json();

    const validatedFields = registerSchema.safeParse(body);

    // Validaciones básicas
    if (!validatedFields.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400 }
      );
    }

    const { nombre, apellido, edad, email, entrada } = body;

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
        from: `"<System notification> Tengoku Games" <${process.env.EMAIL_USER}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: "Nueva inscripción",
        html: `
          <div style="background: linear-gradient(to right, #a00000, #380000); padding: 1.5rem; border-radius: 10px; color: white; font-family: Arial, sans-serif; width: 100%;">
              <h2 style="font-size: 24px; font-weight: bold; color: #fbbf24; text-align: center; margin-bottom: 1rem;">
                Nueva inscripción recibida
              </h2>

              <p style="font-size: 18px; font-weight: bold; color: #FFF; text-align: center; margin: 1rem auto;">
                <strong>· Nombre:</strong> ${nombre}<br>
                <strong>· Apellido:</strong> ${apellido}<br>
                <strong>· Edad:</strong> ${edad}<br>
                <strong>· Email:</strong> ${email}<br>
                <strong>· Entrada:</strong> ${entrada}
              </p>

              <p style="background: linear-gradient(to right, #200000, #300000); width: max-content; padding: 0.25rem 1rem; border-radius: 15px; font-size: 18px; font-weight: 700; line-height: 1.6; color: #FFF; margin: 0.25rem auto; text-align: center;">
                Recuerda respaldar esta información en otro lugar de modo seguro, para evitar que se pierda.
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
          <div style="background: linear-gradient(to right, #a00000, #380000); padding: 1.5rem; border-radius: 10px; color: white; font-family: Arial, sans-serif; width: 100%;">
              <div style="text-align: center; margin-bottom: 1.5rem;">
                  <h1 style="font-size: 38px; font-weight: bold; color: #fff;">
                      ¡Inscripción exitosa!
                  </h1>
              </div>

              <div style="width: max-content; margin: 0 auto; padding: 1rem;">
                  <div style="text-align: center; background: linear-gradient(to right, #200000, #300000); padding: 0.5rem; border-radius: 15px;">
                      <div style="font-size: 20px; font-weight: bold; color: #FFF;">
                          ¡Hola, Bruno!
                      </div>
                      <p style="font-size: 20px; font-weight: bold; color: #FFF; margin: 1rem auto;">
                          Tu inscripción ha sido recibida exitosamente.
                      </p>
                  </div>

                  <p style="font-size: 18px; font-weight: bold; color: #FFF; margin: 1rem auto;">
                    Confirma que tus datos sean correctos:
                  </p>

                  <p style="font-size: 18px; font-weight: bold; color: #FFF; margin: 1rem auto;">
                      <strong>· Nombre:</strong> ${nombre}<br>
                      <strong>· Apellido:</strong> ${apellido}<br>
                      <strong>· Edad:</strong> ${edad}<br>
                      <strong>· Email:</strong> ${email}<br>
                      <strong>· Entrada:</strong> ${entrada}
                  </p>
              </div>

              <p style="background: linear-gradient(to right, #200000, #300000); width: max-content; padding: 0.25rem 1rem; border-radius: 15px; font-size: 18px; font-weight: 700; line-height: 1.6; color: #FFF; margin: 0.25rem auto;">
                  Recuerda presentarte con tu entrada y documento al confirmar tu inscripción.
              </p>

              <div style="text-align: center; margin: 1.25rem;">
                  <img src="https://i.imgur.com/AU2oITs.jpeg" alt="Promo Poster" style="width: 75vw; max-width: 500px; height: auto; display: block; margin: 0 auto;" />
              </div>

              <div style="text-align: center; font-size: 18px; line-height: 1.6;">
                  <p>
                    ¡Gracias por participar en el evento!
                  </p>
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