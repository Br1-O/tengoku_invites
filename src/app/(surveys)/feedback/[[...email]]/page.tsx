"use client";
import { useState, useEffect } from "react";
import type React from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { decodeEmail } from "@/lib/email/encrypt";

const queryClient = new QueryClient();

interface FormData {
  email: string;
  calificacionEvento: string;
  actividadesGustadas: string[];
  opinionPrecio: string;
  comodidadLugar: string;
  facilidadLlegada: string;
  recomendacionTengoku: string;
  sugerencias: string;
}

const submitSurvey = async (form: FormData) => {
  const res = await fetch("/api/surveySatisfaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "No se pudo enviar la encuesta");
  }
  return res.json();
};

const RegisterPage = () => {
  const router = useRouter();
  const params = useParams();
  
  const rawEmailParam = params?.email;
  const emailParam = Array.isArray(rawEmailParam) ? rawEmailParam[0] : rawEmailParam || "";

  const [form, setForm] = useState<FormData>({
    email: "",
    calificacionEvento: "",
    actividadesGustadas: [],
    opinionPrecio: "",
    comodidadLugar: "",
    facilidadLlegada: "",
    recomendacionTengoku: "",
    sugerencias: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (emailParam) {
      const extractedEmail = decodeEmail(emailParam);
      if (extractedEmail) {
        setForm((prev) => ({ ...prev, email: extractedEmail }));
      }
    }
  }, [emailParam]);

  const mutation = useMutation({
    mutationFn: submitSurvey,
    onSuccess: () => {
      router.replace("/feedback/survey_completed");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "¡No se pudo enviar la encuesta!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
      });
    },
  });

  const handleActividadToggle = (actividad: string) => {
    setForm((prev) => {
      const exists = prev.actividadesGustadas.includes(actividad);
      return {
        ...prev,
        actividadesGustadas: exists
          ? prev.actividadesGustadas.filter((a) => a !== actividad)
          : [...prev.actividadesGustadas, actividad],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("* Por favor ingresa un email válido");
      return;
    }

    if (!form.calificacionEvento) {
      setError("* Selecciona una calificación para el evento");
      return;
    }

    if (form.actividadesGustadas.length === 0) {
      setError("* Selecciona al menos una actividad");
      return;
    }

    if (!form.opinionPrecio) {
      setError("* Selecciona una calificación para el precio de la entrada");
      return;
    }

    if (!form.comodidadLugar) {
      setError("* Califica qué tan cómodo te pareció el lugar");
      return;
    }

    if (!form.facilidadLlegada) {
      setError("* Califica qué tan fácil te fue llegar");
      return;
    }

    if (!form.recomendacionTengoku) {
      setError("* Califica qué tanto recomendarías Tengoku");
      return;
    }

    Swal.fire({
      title: "¡Gracias por participar!",
      text: "¿Deseas enviar tus respuestas?",
      icon: "question",
      background: "#1e293b",
      color: "#FFF",
      showCancelButton: true,
      confirmButtonColor: "#c026d3",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(form);
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-center flex-col bg-black/80 py-10 px-4 md:px-6 rounded-lg border-2 border-slate-800">
      <h1 className="text-3xl md:text-5xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-6 py-3 rounded-md font-bold mb-4 shadow-lg shadow-fuchsia-600/20">
        Encuesta Tengoku Animé
      </h1>

      <div className="w-full md:w-3/4 lg:w-2/3 text-white mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Campo Email */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500 transition-colors duration-200 hover:border-fuchsia-500/50"
            />
          </div>

          {/* 1. Calificación General */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué te pareció el evento en general? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`calif-${num}`}
                  className={`flex items-center justify-center p-2.5 rounded-md border cursor-pointer font-semibold transition-all duration-300 ${
                    form.calificacionEvento === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)] scale-105"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-fuchsia-500 hover:bg-slate-700 hover:text-white hover:shadow-[0_0_8px_rgba(217,70,239,0.35)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="calificacionEvento"
                    value={num}
                    checked={form.calificacionEvento === String(num)}
                    onChange={(e) => setForm({ ...form, calificacionEvento: e.target.value })}
                    className="sr-only"
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
              <span>1 - Muy malo</span>
              <span>10 - Excelente</span>
            </div>
          </div>

          {/* 2. Actividades Gustadas */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué actividades te gustaron más? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
              {[
                "Concurso de cosplay",
                "Concurso de canto",
                "Concurso de dibujo",
                "Concurso de baile",
                "Invitados",
                "Sorteos",
                "Stands",
              ].map((act) => {
                const isSelected = form.actividadesGustadas.includes(act);
                return (
                  <label
                    key={act}
                    className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-fuchsia-950/40 border-fuchsia-500 text-white shadow-[0_0_10px_rgba(217,70,239,0.3)]"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-fuchsia-500 hover:bg-slate-700/80 hover:text-white hover:shadow-[0_0_8px_rgba(217,70,239,0.25)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleActividadToggle(act)}
                      className="accent-fuchsia-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium">{act}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Valor Entrada */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué opinas del valor de la entrada en relación a los premios y actividades? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`precio-${num}`}
                  className={`flex items-center justify-center p-2.5 rounded-md border cursor-pointer font-semibold transition-all duration-300 ${
                    form.opinionPrecio === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)] scale-105"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-fuchsia-500 hover:bg-slate-700 hover:text-white hover:shadow-[0_0_8px_rgba(217,70,239,0.35)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="opinionPrecio"
                    value={num}
                    checked={form.opinionPrecio === String(num)}
                    onChange={(e) => setForm({ ...form, opinionPrecio: e.target.value })}
                    className="sr-only"
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
              <span>1 - Muy caro</span>
              <span>10 - Muy acorde</span>
            </div>
          </div>

          {/* 4. Comodidad del Lugar */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué tan cómodo te pareció el lugar? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`comodidad-${num}`}
                  className={`flex items-center justify-center p-2.5 rounded-md border cursor-pointer font-semibold transition-all duration-300 ${
                    form.comodidadLugar === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)] scale-105"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-fuchsia-500 hover:bg-slate-700 hover:text-white hover:shadow-[0_0_8px_rgba(217,70,239,0.35)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="comodidadLugar"
                    value={num}
                    checked={form.comodidadLugar === String(num)}
                    onChange={(e) => setForm({ ...form, comodidadLugar: e.target.value })}
                    className="sr-only"
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
              <span>1 - Incómodo</span>
              <span>10 - Excelente</span>
            </div>
          </div>

          {/* 5. Facilidad para llegar */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Cuán fácil te fue llegar? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`llegada-${num}`}
                  className={`flex items-center justify-center p-2.5 rounded-md border cursor-pointer font-semibold transition-all duration-300 ${
                    form.facilidadLlegada === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)] scale-105"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-fuchsia-500 hover:bg-slate-700 hover:text-white hover:shadow-[0_0_8px_rgba(217,70,239,0.35)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="facilidadLlegada"
                    value={num}
                    checked={form.facilidadLlegada === String(num)}
                    onChange={(e) => setForm({ ...form, facilidadLlegada: e.target.value })}
                    className="sr-only"
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
              <span>1 - Muy difícil</span>
              <span>10 - Muy fácil</span>
            </div>
          </div>

          {/* 6. Recomendación de Tengoku */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué tanto recomendarías Tengoku? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`recomendacion-${num}`}
                  className={`flex items-center justify-center p-2.5 rounded-md border cursor-pointer font-semibold transition-all duration-300 ${
                    form.recomendacionTengoku === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)] scale-105"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-fuchsia-500 hover:bg-slate-700 hover:text-white hover:shadow-[0_0_8px_rgba(217,70,239,0.35)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="recomendacionTengoku"
                    value={num}
                    checked={form.recomendacionTengoku === String(num)}
                    onChange={(e) => setForm({ ...form, recomendacionTengoku: e.target.value })}
                    className="sr-only"
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
              <span>1 - No lo recomendaría</span>
              <span>10 - Totalmente</span>
            </div>
          </div>

          {/* 7. Sugerencias */}
          <div className="w-full bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <label className="block text-fuchsia-400 text-lg font-bold mb-2">
              ¿Tenés sugerencias de actividades y/o invitados que desearas ver?{" "}
              <span className="text-slate-400 font-normal text-base">(Opcional)</span>
            </label>
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Escribí acá tus ideas o sugerencias... (máx 500 caracteres)"
              value={form.sugerencias}
              onChange={(e) => setForm({ ...form, sugerencias: e.target.value })}
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 transition-colors duration-200 hover:border-fuchsia-500/50"
            />
          </div>

          {error && (
            <p className="text-yellow-300 font-semibold bg-yellow-950/40 p-3 rounded-md border border-yellow-700/50 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-3.5 rounded-md hover:brightness-110 disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] mt-2 text-lg"
          >
            {mutation.isPending ? "Enviando..." : "Enviar respuestas"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterPage />
    </QueryClientProvider>
  );
}