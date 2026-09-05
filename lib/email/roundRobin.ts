interface EmailAccount {
  user: string;
  pass: string;
}

// 1. Obtener dinámicamente todas las cuentas del .env (EMAIL_USER_1, EMAIL_PASS_1, etc.)
export const getEmailAccounts = (): EmailAccount[] => {
  const accounts: EmailAccount[] = [];
  let index = 1;

  while (process.env[`EMAIL_USER_${index}`] && process.env[`EMAIL_PASS_${index}`]) {
    accounts.push({
      user: process.env[`EMAIL_USER_${index}`] as string,
      pass: process.env[`EMAIL_PASS_${index}`] as string,
    });
    index++;
  }

  return accounts;
};

// 2. Selección determinista sin estado global (Stateless Round Robin)
export const getDeterministicAccount = (): EmailAccount => {
  const accounts = getEmailAccounts();
  if (accounts.length === 0) {
    throw new Error("No hay cuentas de email configuradas.");
  }

  // Si solo hay una cuenta, retorna esa directamente
  if (accounts.length === 1) return accounts[0];

  // timestamp actual (en segundos) para determinar la casilla.
  // Rotará de forma determinista y uniforme en cada petición independiente.
  const timeSlot = Math.floor(Date.now() / 1000);
  const index = timeSlot % accounts.length;

  return accounts[index];
};