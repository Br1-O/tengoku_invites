import client from "@/lib/prismaInstance";
import { surveySchema } from "@/lib/validations/surveySatisfaction";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "El cuerpo de la petición no es un JSON válido" }),
        { status: 400 }
      );
    }

    const validatedFields = surveySchema.safeParse(body);

    if (!validatedFields.success) {
      return new Response(
        JSON.stringify({ error: validatedFields.error.flatten().fieldErrors }),
        { status: 400 }
      );
    }

    const {
      email,
      calificacionEvento,
      actividadesGustadas,
      opinionPrecio,
      comodidadLugar,
      facilidadLlegada,
      recomendacionTengoku,
      sugerencias,
      suscribirNovedades,
    } = validatedFields.data;

    // Guardar en MongoDB con Prisma
    try {
      await client.encuestaSatisfaccion.create({
        data: {
          email,
          calificacionEvento: parseInt(calificacionEvento, 10),
          actividadesGustadas,
          opinionPrecio: parseInt(opinionPrecio, 10),
          comodidadLugar: parseInt(comodidadLugar, 10),
          facilidadLlegada: parseInt(facilidadLlegada, 10),
          recomendacionTengoku: parseInt(recomendacionTengoku, 10),
          sugerencias: sugerencias || "",
          suscribirNovedades: Boolean(suscribirNovedades),
        },
      });
    } catch (dbError) {
      console.error("Error al guardar en la base de datos:", dbError);
      return new Response(
        JSON.stringify({ error: "Error al guardar la encuesta en la base de datos" }),
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
        subject: "Nueva respuesta de Encuesta de Satisfacción",
        html: `
          <div style="background: linear-gradient(to right, #a00000, #380000); padding: 1.5rem; border-radius: 10px; color: white; font-family: Arial, sans-serif; width: 100%;">
              <h2 style="font-size: 24px; font-weight: bold; color: #fbbf24; text-align: center; margin-bottom: 1rem;">
                Nueva encuesta recibida
              </h2>

              <div style="font-size: 16px; color: #FFF; margin: 1rem auto; max-width: 600px; line-height: 1.6;">
                <p><strong>· Email del usuario:</strong> ${email}</p>
                <p><strong>· Calificación General:</strong> ${calificacionEvento} / 10</p>
                <p><strong>· Actividades que le gustaron:</strong><br> ${actividadesGustadas.map((act) => `  - ${act}`).join("<br>")}</p>
                <p><strong>· Opinión del Precio:</strong> ${opinionPrecio} / 10</p>
                <p><strong>· Comodidad del Lugar:</strong> ${comodidadLugar} / 10</p>
                <p><strong>· Facilidad para Llegar:</strong> ${facilidadLlegada} / 10</p>
                <p><strong>· Recomienda Tengoku:</strong> ${recomendacionTengoku} / 10</p>
                <p><strong>· Sugerencias / Comentarios:</strong><br> ${sugerencias && sugerencias.trim() !== "" ? sugerencias : "<em>Sin sugerencias</em>"}</p>
                <p><strong>· Suscripto a sorteos/novedades:</strong> ${suscribirNovedades ? "✅ SÍ" : "❌ NO"}</p>
              </div>

              <p style="background: linear-gradient(to right, #200000, #300000); width: max-content; padding: 0.5rem 1rem; border-radius: 15px; font-size: 14px; font-weight: 700; color: #FFF; margin: 1rem auto; text-align: center;">
                Esta respuesta ya se encuentra almacenada en la base de datos de MongoDB Atlas.
              </p>
          </div>
        `,
      });
    } catch (sendMailError) {
      console.error("Error al enviar el correo para los organizadores:", sendMailError);
      return new Response(
        JSON.stringify({ error: "Error al enviar el correo a los organizadores" }),
        { status: 500 }
      );
    }

    // Correo de confirmación al usuario
    if (email) {
      try {
        await transporter.sendMail({
          from: `"Organización Tengoku Games" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "¡Gracias por tu opinión sobre Tengoku Games!",
          html: `
            <div style="background: linear-gradient(to right, #a00000, #380000); padding: 1.5rem; border-radius: 10px; color: white; font-family: Arial, sans-serif; width: 100%;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <h1 style="font-size: 32px; font-weight: bold; color: #fff;">
                        ¡Gracias por completar la encuesta!
                    </h1>
                </div>

                <div style="width: max-content; margin: 0 auto; padding: 1rem;">
                    <div style="text-align: center; background: linear-gradient(to right, #200000, #300000); padding: 1rem; border-radius: 15px;">
                        <p style="font-size: 18px; font-weight: bold; color: #FFF; margin: 0;">
                            Recibimos tus respuestas correctamente.
                        </p>
                    </div>

                    <p style="font-size: 16px; color: #FFF; margin: 1.5rem auto; text-align: center; max-width: 500px; line-height: 1.5;">
                      Queríamos agradecerte por tomarte el tiempo de compartir tu experiencia con nosotros. 
                      <strong>Tendremos muy en cuenta tus opiniones y sugerencias</strong> para que la próxima edición de Tengoku Games sea aún más increíble.
                    </p>
                </div>

                <p style="background: linear-gradient(to right, #200000, #300000); width: max-content; padding: 0.5rem 1rem; border-radius: 15px; font-size: 16px; font-weight: 700; color: #FFF; margin: 0.5rem auto; text-align: center;">
                    ¡Nos vemos en la próxima convención!
                </p>

                <div style="text-align: center; margin: 1.25rem;">
                    <img src="https://i.imgur.com/AU2oITs.jpeg" alt="Promo Poster" style="width: 75vw; max-width: 500px; height: auto; display: block; margin: 0 auto; border-radius: 8px;" />
                </div>
            </div>
          `,
        });
      } catch (sendMailError) {
        console.error("Error al enviar el correo de confirmación al usuario:", sendMailError);
      }
    }

    return new Response(
      JSON.stringify({ message: "Encuesta de satisfacción procesada con éxito" }),
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