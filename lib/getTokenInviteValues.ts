"use server";

import fs from "fs";
import path from "path";

function getTokenInvitesValues() {
  try {
    const invitesFilePath = path.join(process.cwd(), "config/resources/", "token_invites.json");

    if (!fs.existsSync(invitesFilePath)) {
      console.error("Archivo token_invites.json no encontrado.");
      return {};
    }

    const invites = JSON.parse(fs.readFileSync(invitesFilePath, "utf8"));
    return invites;
  } catch (error) {
    console.error("Error al leer el archivo de invitaciones:", error);
    return {};
  }
}

export async function getInviteValueFromToken(token: string) {
  const invites = getTokenInvitesValues();
  return invites[token] || null;
}