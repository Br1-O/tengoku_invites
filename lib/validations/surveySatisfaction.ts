import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const surveySchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "* El email es requerido" })
    .regex(emailRegex, { message: "* El email no es válido" }),

  calificacionEvento: z
    .string()
    .min(1, "*por favor selecciona una calificación para el evento")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      "*la calificación del evento debe ser entre 1 y 10"
    ),

  actividadesGustadas: z
    .array(z.string())
    .min(1, "*debes seleccionar al menos una actividad"),

  opinionPrecio: z
    .string()
    .min(1, "*por favor selecciona una calificación para el valor de la entrada")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      "*la calificación del precio debe ser entre 1 y 10"
    ),

  comodidadLugar: z
    .string()
    .min(1, "*por favor selecciona una calificación para la comodidad del lugar")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      "*la calificación de la comodidad debe ser entre 1 y 10"
    ),

  facilidadLlegada: z
    .string()
    .min(1, "*por favor selecciona una calificación para la facilidad de llegada")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      "*la calificación de la llegada debe ser entre 1 y 10"
    ),

  recomendacionTengoku: z
    .string()
    .min(1, "*por favor selecciona qué tanto recomendarías Tengoku")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      },
      "*la calificación de recomendación debe ser entre 1 y 10"
    ),

  sugerencias: z
    .string()
    .max(500, "*las sugerencias no pueden superar los 500 caracteres")
    .optional(),

  suscribirNovedades: z
    .boolean()
    .optional()
    .default(false)
});

export type EncuestaFormData = z.infer<typeof surveySchema>;