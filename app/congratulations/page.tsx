"use client";
import { useState } from "react";
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        email: "",
        entrada: "",
    });

    const [isChecked, setIsChecked] = useState(false);
    const [firstClick, setFirstClick] = useState(true);
    const [error, setError] = useState("");
  
    const handleCheckboxClick = () => {
      if (firstClick) {
        // Abre una nueva pestaña con los términos y condiciones
        window.open("/terms", "_blank");
        setFirstClick(false); // Evita que siga abriendo la página en cada clic
      } else {
        setIsChecked(!isChecked); // Alterna el estado del checkbox
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.nombre.trim() || !form.apellido.trim() || !form.email || !form.entrada || !isChecked) {
            setError("Todos los campos son obligatorios");
            return;
        }
        
        // Validar que nombre y apellido solo contengan letras y espacios, y que no sean solo espacios
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.nombre) || form.nombre.trim().length === 0) {
            setError("El nombre solo puede contener letras y espacios, y no puede estar vacío");
            return;
        }
        
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.apellido) || form.apellido.trim().length === 0) {
            setError("El apellido solo puede contener letras y espacios, y no puede estar vacío");
            return;
        }
        
        // Validar que la edad sea un número entre 18 y 99
        if (!/^\d+$/.test(form.edad) || parseInt(form.edad) < 18) {
            setError("Debes ser mayor de 18 años para participar.");
            return;
        }else if(parseInt(form.edad) >= 100){
            setError("Debes tener hasta 99 años para participar.");
            return;
        }
        
        // Validar que el email tenga un formato correcto
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError("El email no es válido");
            return;
        }
        
        // Validar que la entrada sea un número mayor a 0
        if (!/^\d+$/.test(form.entrada) || parseInt(form.entrada) <= 0) {
            setError("El número de entrada debe ser un número mayor a 0");
            return;
        }        

        setError("");

        Swal.fire({
            title: "¡IMPORTANTE!",
            html: `
                <div style="
                max-width: 500px; 
                text-align: center; 
                margin: auto; 
                padding: 15px; 
                background: rgba(220, 38, 38, 0.8); 
                border-radius: 10px;
                border: 2px solid white;
                ">
                <p style="font-size: 16px; color: #E5E7EB;">
                    Recuerda que para que la inscripción sea válida 
                    <span style="color: white; font-weight: bold; text-decoration: underline;"> 
                    deberás presentarte a las 14:00 hs. en la base del escenario
                    </span> 
                    para confirmar tu participación, 
                    <span style="color: white; font-weight: bold; text-decoration: underline;">
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
            cancelButtonText: "Cancelar"
          }).then(async(result) => {
            if (result.isConfirmed) {
                
                const res = await fetch("/api/inscribir", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                if (res.ok) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 3000,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "¡Inscripción enviada! Revisa tu correo."
                      });
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 3000,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "error",
                        title: "¡No se pudo enviar la solicitud!"
                      });
                }
            }
          });
    };

    return (
        <div className="w-full flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-5 rounded-lg border-2 border-slate-700">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    ¡Tu entrada es una de las elegidas para participar!
                </h1>
            </div>

            <div className="flex items-center justify-center flex-col my-3">
                <div className="text-3xl md:text-6xl text-white px-4 p-2 rounded-md pb-4 w-fit text-center">
                    Completá con tus datos:
                </div>
            </div>

            <div className="w-full md:w-1/2 text-white my-4 mx-auto">
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center p-6 rounded-md text-start">
                    
                    <label 
                    htmlFor="nombre" 
                    className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"> 
                        Nombre 
                    </label>
                    <input 
                    type="text" 
                    name="nombre" 
                    placeholder="Ingresa tu nombre" 
                    onChange={handleChange} 
                    className="block w-full md:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50" 
                    />

                    <label 
                    htmlFor="apellido" 
                    className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"> 
                        Apellido 
                    </label>
                    <input 
                    type="text" 
                    name="apellido" 
                    placeholder="Ingresa tu apellido" 
                    onChange={handleChange} 
                    className="block w-full md:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50" 
                    />

                    <label 
                    htmlFor="edad" 
                    className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"> 
                        Edad 
                    </label>
                    <input 
                    type="number" 
                    name="edad" 
                    placeholder="Ingresa tu edad" 
                    onChange={handleChange} 
                    className="block w-full md:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50" 
                    />

                    <label 
                    htmlFor="email" 
                    className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"> 
                        Email 
                    </label>
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="Ingresa tu email" 
                    onChange={handleChange} 
                    className="block w-full md:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50" 
                    />

                    <label 
                    htmlFor="entrada" 
                    className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold"> 
                        N° de entrada 
                    </label>
                    <input 
                    type="text" 
                    name="entrada" 
                    placeholder="Número de entrada" 
                    onChange={handleChange} 
                    className="block w-full md:w-3/5 p-2 mb-2 rounded-md bg-slate-500 bg-opacity-50" 
                    />

                    <div className="flex flex-row gap-1">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxClick}
                            className="w-4 h-4 mr-2"
                            />
                            Acepto los
                        </label>
                        <a href="/terms" className="text-blue-500 underline">términos y condiciones</a>.
                    </div>


                    <button 
                    type="submit" 
                    className="md:text-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 py-2 mt-4 rounded-md"
                    >
                        Enviar
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;