import { z } from "zod"

export const registerSchema = z.object({
  nombre: z
    .string()
    .min(1, "*el nombre es requerido")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "*el nombre solo puede contener letras y espacios"),
  apellido: z
    .string()
    .min(1, "*el apellido es requerido")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "*el apellido solo puede contener letras y espacios"),
  edad: z
    .string()
    .refine((val) => !isNaN(Number(val)), "*la edad debe ser un número")
    .refine((val) => Number(val) >= 18, "*debes ser mayor de 18 años para participar")
    .refine((val) => Number(val) < 100, "*debes tener hasta 99 años para participar"),
  email: z.string().min(1, "*el email es requerido").email("El email no es válido"),
  entrada: z.string().min(1, "*el número de entrada es requerido"),
})

export type RegisterFormData = z.infer<typeof registerSchema>