// Ejemplo de botón de Logout
"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-lg transition-colors"
    >
      Cerrar Sesión
    </button>
  );
}