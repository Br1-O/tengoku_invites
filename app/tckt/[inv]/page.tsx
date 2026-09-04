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
  
  // Obtenemos el parámetro [inv] de la URL
  const invParam = Array.isArray(params?.inv) ? params.inv[0] : params?.inv || "";

  const [form, setForm] = useState<FormData>({
    email: "",
    calificacionEvento: "",
    actividadesGustadas: [],
    opinionPrecio: "",
    sugerencias: "",
  });

  // const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Al cargar, intentamos decodificar el email del path
  useEffect(() => {
    if (invParam) {
      const extractedEmail = decodeEmail(invParam);
      if (extractedEmail) {
        setForm((prev) => ({ ...prev, email: extractedEmail }));
      }
    }
  }, [invParam]);

  const mutation = useMutation({
    mutationFn: submitSurvey,
    onSuccess: () => {
      router.replace("/tckt/survey_completed");
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

    // Validaciones locales rápidas
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

    // if (!isChecked) {
    //   setError("* Debes aceptar los términos y condiciones");
    //   return;
    // }
    
    {/* Términos */}
    {/* <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className="accent-fuchsia-500 w-4 h-4"
      />
      <span className="text-sm">Acepto los términos y condiciones</span>
    </div> */}


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
    <div className="w-full flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 px-5 rounded-lg border-2 border-slate-700">
      <h1 className="text-3xl md:text-5xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md font-bold">
        Encuesta del Evento
      </h1>

      <div className="w-full md:w-3/4 lg:w-2/3 text-white mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Campo Email */}
          <div className="w-full">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* 1. Calificación General */}
          <div className="w-full">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué te pareció el evento en general? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`calif-${num}`}
                  className={`flex items-center justify-center p-2 rounded border cursor-pointer ${
                    form.calificacionEvento === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400"
                      : "bg-slate-800 border-slate-700"
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
          </div>

          {/* 2. Actividades Gustadas */}
          <div className="w-full">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué actividad te gustó más? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {[
                "Concurso de cosplay",
                "Concurso de canto",
                "De dibujo",
                "De baile",
                "Invitados",
                "Sorteos",
                "Stands",
              ].map((act) => (
                <label key={act} className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.actividadesGustadas.includes(act)}
                    onChange={() => handleActividadToggle(act)}
                    className="accent-fuchsia-500 w-4 h-4"
                  />
                  <span>{act}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Valor Entrada */}
          <div className="w-full">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              ¿Qué opinas del valor de la entrada? *
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label
                  key={`precio-${num}`}
                  className={`flex items-center justify-center p-2 rounded border cursor-pointer ${
                    form.opinionPrecio === String(num)
                      ? "bg-fuchsia-600 border-fuchsia-400"
                      : "bg-slate-800 border-slate-700"
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
          </div>

          {/* 4. Sugerencias */}
          <div className="w-full">
            <label className="block text-fuchsia-400 text-lg font-bold mb-1">
              Sugerencias (Opcional)
            </label>
            <textarea
              rows={3}
              maxLength={500}
              value={form.sugerencias}
              onChange={(e) => setForm({ ...form, sugerencias: e.target.value })}
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {error && <p className="text-yellow-300 font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-3 rounded-md hover:brightness-110 disabled:opacity-50"
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