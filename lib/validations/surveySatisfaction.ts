import { z } from "zod"
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
        const num = Number(val)
        return !isNaN(num) && num >= 1 && num <= 10
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
        const num = Number(val)
        return !isNaN(num) && num >= 1 && num <= 10
      },
      "*la calificación del precio debe ser entre 1 y 10"
    ),

  sugerencias: z
    .string()
    .max(500, "*las sugerencias no pueden superar los 500 caracteres")
    .optional(),
})

export type EncuestaFormData = z.infer<typeof surveySchema>