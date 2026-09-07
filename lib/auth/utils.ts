// lib/auth.ts
import * as bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_super_secret_key_change_me"
);
const SALT_ROUNDS = 12;

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
}

// 1. Hashear Contraseña (Solo Server/Node.js)
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// 2. Comparar Contraseña (Solo Server/Node.js)
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// 3. Generar JWT Token (Compatible con Edge + Node.js)
export const generateToken = async (payload: JWTPayload): Promise<string> => {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
};

// 4. Verificar JWT Token (Compatible con Edge + Node.js)
export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null; // Expirado o alterado
  }
};