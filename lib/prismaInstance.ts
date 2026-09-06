// lib/prismaInstance.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismadb: PrismaClient | undefined;
};

const client = globalForPrisma.prismadb ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismadb = client;
}

export default client;