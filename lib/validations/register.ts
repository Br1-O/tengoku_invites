import { z } from "zod"
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  email: z
    .string()
    .trim()
    .min(1, { message: "* El email es requerido" })
    .regex(emailRegex, { message: "* El email no es válido" }),  
  entrada: z.string().min(1, "*el número de entrada es requerido"),
})

export type RegisterFormData = z.infer<typeof registerSchema>