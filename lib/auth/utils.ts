// lib/auth.ts
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_key_change_me";
const SALT_ROUNDS = 12;

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
}

// 1. Hashear Contraseña
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// 2. Comparar Contraseña
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// 3. Generar JWT Token
export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
};

// 4. Verificar JWT Token
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
};