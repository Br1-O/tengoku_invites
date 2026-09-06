"use server";

function getTokenInvitesValues() {
  try {
    let invites;
    if (process.env.TOKEN_INVITES) {
      invites = JSON.parse(process.env.TOKEN_INVITES);
    }
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