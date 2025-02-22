"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Swal from "sweetalert2"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

// Type definitions
interface FormData {
  nombre: string
  apellido: string
  edad: string
  email: string
  entrada: string
}

interface InviteResponse {
  inviteValue?: string 
  error?: string
}

interface RegisterResponse {
    message?: string;
    error?: string;
}

// API functions
const fetchInviteNumber = async (token: string): Promise<InviteResponse> => {
  const res = await fetch(`/api/invites/getValue?token=${token}`)
  if (!res.ok) return {error: "No se encontró el número de invitación"};
  return res.json()
}

const checkInviteValue = async (inviteValue: string): Promise<{ isRegistered: boolean }> => {
  const res = await fetch("/api/invites/checkValue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inviteValue }),
  })
  if (!res.ok) throw new Error("Error al verificar el número de invitación")
  return res.json()
}

const registerUser = async (form: FormData): Promise<RegisterResponse> => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  })
  if (!res.ok) throw new Error("No se pudo enviar la solicitud")
  return res.json()
}

// Wrap the component with QueryClientProvider
const RegisterPageWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterPage />
    </QueryClientProvider>
  )
}

const RegisterPage = () => {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
    entrada: "",
  })
  const [isChecked, setIsChecked] = useState(false)
  const [firstClick, setFirstClick] = useState(true)
  const [inviteNumber, setInviteNumber] = useState("")
  const [error, setError] = useState("")

  const { inv: token } = useParams()


  // Improved React Query implementation
  const { data: inviteData, isLoading } = useQuery({
    queryKey: ["invite", token],
    queryFn: () => fetchInviteNumber(token as string),
    enabled: !!token,
    retry: false,
  })


  // Handle success case separately using useEffect
  useEffect(() => {
    const handleInviteData = async () => {
      if (inviteData?.inviteValue) {
        try {
          const response = await checkInviteValue(inviteData.inviteValue)
          if (response.isRegistered) {
            router.replace(`/register-error/${inviteData.inviteValue}`)
          } else {
            setInviteNumber(inviteData.inviteValue)
          }
        } catch (error) {
            console.error("Error: ", error);
            router.replace("/")
        }
      } else if (inviteData?.error) {
        router.replace("/")
      }
    }

    handleInviteData()
  }, [inviteData, router])

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
        router.replace(`/registered/${inviteNumber}`)
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "¡No se pudo enviar la solicitud!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
      })
    },
  })

  const handleCheckboxClick = () => {
    if (firstClick) {
      window.open("/terms", "_blank")
      setFirstClick(false)
    } else {
      setIsChecked(!isChecked)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedForm = { ...form, entrada: inviteNumber }

    if (
      !updatedForm.nombre.trim() ||
      !updatedForm.apellido.trim() ||
      !updatedForm.email ||
      !updatedForm.entrada ||
      !isChecked
    ) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(updatedForm.nombre) || updatedForm.nombre.trim().length === 0) {
      setError("El nombre solo puede contener letras y espacios, y no puede estar vacío")
      return
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(updatedForm.apellido) || updatedForm.apellido.trim().length === 0) {
      setError("El apellido solo puede contener letras y espacios, y no puede estar vacío")
      return
    }

    if (!/^\d+$/.test(updatedForm.edad) || Number.parseInt(updatedForm.edad) < 18) {
      setError("Debes ser mayor de 18 años para participar.")
      return
    } else if (Number.parseInt(updatedForm.edad) >= 100) {
      setError("Debes tener hasta 99 años para participar.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedForm.email)) {
      setError("El email no es válido")
      return
    }

    setError("")

    Swal.fire({
      title: "¡IMPORTANTE!",
      html: `
        <div style="max-width: 500px; text-align: center; margin: auto; padding: 15px; background: rgba(220, 38, 38, 0.8); border-radius: 10px; border: 2px solid white">
          <p style="font-size: 16px; color: #E5E7EB">
            Recuerda que para que la inscripción sea válida
            <span style="color: white; font-weight: bold; text-decoration: underline">
              deberás presentarte a las 14:00 hs. en la base del escenario
            </span>
            para confirmar tu participación,
            <span style="color: white; font-weight: bold; text-decoration: underline">
              con tu entrada en mano.
            </span>
          </p>
        </div>
      `,
      icon: "warning",
      background: "rgba(255,100,100,0.9)",
      color: "#FFF",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Deseo inscribirme!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(updatedForm)
      }
    })
  }

  // Show loading state for the entire page
  if (isLoading || !inviteNumber) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-5 rounded-lg border-2 border-slate-700">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          ¡Tu entrada es una de las elegidas para participar!
        </h1>
      </div>

      <div className="flex items-center justify-center flex-col my-3">
        <div className="text-3xl md:text-6xl text-white px-4 p-2 rounded-md pb-4 w-fit text-center">
          Completá el formulario, jugador {inviteNumber}:
        </div>
      </div>

      <div className="w-full md:w-1/2 text-white my-4 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center p-6 rounded-md text-start"
        >
          <label
            htmlFor="nombre"
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            onChange={handleChange}
            className="block w-full lg:w-4/5 xl:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50"
          />

          <label
            htmlFor="apellido"
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"
          >
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            placeholder="Ingresa tu apellido"
            onChange={handleChange}
            className="block w-full lg:w-4/5 xl:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50"
          />

          <label
            htmlFor="edad"
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"
          >
            Edad
          </label>
          <input
            type="number"
            name="edad"
            placeholder="Ingresa tu edad"
            onChange={handleChange}
            className="block w-full lg:w-4/5 xl:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50"
          />

          <label
            htmlFor="email"
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu email"
            onChange={handleChange}
            className="block w-full lg:w-4/5 xl:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50"
          />

          <input type="text" name="entrada" placeholder="Número de entrada" onChange={handleChange} hidden />

          <div className="flex flex-row gap-1">
            <label className="flex items-center cursor-pointer text-nowrap">
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxClick} className="w-4 h-4 mr-2" />
              Acepto los
            </label>
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-nowrap">
              términos y condiciones
            </a>
            .
          </div>
          
          <button
            type="submit"
            disabled={mutation.isPending}
            className="md:text-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 py-2 mt-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Enviando..." : "Enviar"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default RegisterPageWrapper