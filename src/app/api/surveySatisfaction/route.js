import client from "@/lib/prismaInstance";
import { surveySchema } from "@/lib/validations/surveySatisfaction";
import { getDeterministicAccount } from "@/lib/email/roundRobin";
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

    // Seleccionar cuenta de forma determinista
    let selectedAccount;
    let transporter;

    try {
      selectedAccount = getDeterministicAccount();
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: selectedAccount.user,
          pass: selectedAccount.pass,
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
        from: `"<System notification> Tengoku Games" <${selectedAccount.user}>`,
        to: selectedAccount.user,
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
                Enviado vía: ${selectedAccount.user} | Almacenado en MongoDB Atlas.
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
          from: `"Organización Tengoku Imperial" <${selectedAccount.user}>`,
          to: email,
          subject: "¡Gracias por tu opinión sobre la convención Tengoku!",

          html: `
            <div
              style="
                width: 100%;
                margin: 0;
                padding: 0;
                background-color: #700000;
                background: linear-gradient(to right, #a00000, #380000);
                font-family: Arial, Helvetica, sans-serif;
              "
            >
              <div
                style="
                  max-width: 700px;
                  margin: 0 auto;
                  padding: 30px 20px;
                  box-sizing: border-box;
                  color: #ffffff;
                "
              >

                <!-- Título -->
                <div
                  style="
                    text-align: center;
                    margin-bottom: 25px;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      font-size: 32px;
                      line-height: 1.2;
                      font-weight: bold;
                      color: #ffffff;
                    "
                  >
                    ¡Gracias por completar la encuesta!
                  </h1>
                </div>


                <!-- Mensaje principal -->
                <div
                  style="
                    max-width: 550px;
                    margin: 0 auto;
                  "
                >

                  <div
                    style="
                      text-align: center;
                      background-color: #250000;
                      background: linear-gradient(to right, #200000, #300000);
                      padding: 16px;
                      border-radius: 15px;
                      margin-bottom: 25px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 18px;
                        line-height: 1.4;
                        font-weight: bold;
                        color: #ffffff;
                      "
                    >
                      Recibimos tus respuestas correctamente.
                    </p>
                  </div>


                  <p
                    style="
                      margin: 0 0 25px 0;
                      font-size: 16px;
                      line-height: 1.6;
                      color: #ffffff;
                      text-align: center;
                    "
                  >
                    Queríamos agradecerte por tomarte el tiempo de compartir
                    tu experiencia con nosotros.
                    <strong>
                      Tendremos muy en cuenta tus opiniones y sugerencias
                    </strong>
                    para que la próxima edición de Tengoku Imperial sea aún más increíble.
                  </p>

                </div>


                <!-- Despedida -->
                <div
                  style="
                    text-align: center;
                    margin: 25px auto;
                  "
                >
                  <p
                    style="
                      display: inline-block;
                      margin: 0;
                      padding: 10px 20px;
                      background-color: #250000;
                      background: linear-gradient(to right, #200000, #300000);
                      border-radius: 15px;
                      font-size: 16px;
                      line-height: 1.4;
                      font-weight: 700;
                      color: #ffffff;
                    "
                  >
                    ¡Nos vemos en la próxima convención!
                  </p>
                </div>


                <!-- Tarjeta promocional -->
                <div
                  style="
                    text-align: center;
                    margin: 30px auto 10px auto;
                  "
                >
                  <a
                    href="https://tengoku.com.ar"
                    target="_blank"
                    style="
                      text-decoration: none;
                    "
                  >
                    <img
                      src="https://tengokugame.vercel.app/images/tengoku-banner-email.webp"
                      alt="Tengoku Banner"
                      width="600"
                      style="
                        display: block;
                        width: 100%;
                        max-width: 600px;
                        height: auto;
                        margin: 0 auto;
                        border: 0;
                        border-radius: 8px;
                      "
                    />
                  </a>
                </div>


              </div>
            </div>
          `,
        });
      } catch (sendMailError) {
        console.error(
          "Error al enviar el correo de confirmación al usuario:",
          sendMailError
        );
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