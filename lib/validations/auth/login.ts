// src/lib/schemas/auth.ts
import { z } from "zod";

export const LoginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: "Usuario o email requerido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;