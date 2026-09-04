// Para codificar cuando generes los links de las invitaciones
export const encodeEmail = (email: string): string => {
  try {
    return btoa(email)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } catch {
    return "";
  }
};

// Para decodificar en la página de la encuesta
export const decodeEmail = (hash: string): string => {
  try {
    // Restaurar caracteres base64 estándar
    let base64 = hash.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const decoded = atob(base64);
    // Verificar si realmente luce como email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(decoded) ? decoded : "";
  } catch {
    return ""; // Si falla la decodificación o no es Base64, retorna cadena vacía
  }
};