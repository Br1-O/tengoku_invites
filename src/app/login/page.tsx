// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/src/components/admin/AdminCard";
import { LoginSchema } from "@/lib/validations/auth/login";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    usernameOrEmail?: string;
    password?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const validationResult = LoginSchema.safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors: { usernameOrEmail?: string; password?: string } = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as "usernameOrEmail" | "password";
        formattedErrors[fieldName] = issue.message;
      });
      setFieldErrors(formattedErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Credenciales inválidas");
      }

      router.push("/dashboard/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto py-8">
      <AdminCard className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="inline-block bg-[#ff0080] text-white text-xl sm:text-2xl font-extrabold px-6 py-1.5 rounded-md shadow-lg uppercase tracking-wider">
            Iniciar Sesión
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-3">
            Ingresá a tu cuenta de Tengoku
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-red-400 text-xs sm:text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5"
            >
              Usuario o Correo Electrónico
            </label>
            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              placeholder="tu@email.com o usuario"
              className={`w-full bg-[#0b0f19] text-white placeholder-gray-500 text-sm border rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors ${
                fieldErrors.usernameOrEmail
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#1e293b] focus:border-[#ff0080]"
              }`}
            />
            {fieldErrors.usernameOrEmail && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.usernameOrEmail}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full bg-[#0b0f19] text-white placeholder-gray-500 text-sm border rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors ${
                fieldErrors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#1e293b] focus:border-[#ff0080]"
              }`}
            />
            {fieldErrors.password && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#ff0080] hover:bg-[#ff0080]/90 text-white font-bold text-sm py-2.5 px-4 rounded-lg shadow-lg hover:shadow-[#ff0080]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Ingresando...</span>
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </AdminCard>
    </div>
  );
}