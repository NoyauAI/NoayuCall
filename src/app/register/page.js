"use client";
import React, {useState, useEffect} from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "./Input"
import { Button } from "@/components/ui/button"
import LoginConfirmationModal from "@/components/ui/modal";

const Register = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

        const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {}

         if (!formData.username) newErrors.username = "Campo nome não pode estar vazio!";
        if (!formData.email) newErrors.email = "Digite um email válido!";
        if (!formData.password) newErrors.password = "Campo senha não pode estar vazio!";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "As senhas não coincidem";

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
      setIsModalOpen(true)
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
    }

        const handleClose = () => {
        setIsModalOpen(false)

        router.push('/login')
    }

    return (
        <div className=" w-screen h-screen flex justify-around items-center p-10" >     
                <div className="hidden lg:flex flex-col text-4xl w-2/4 font-bold" > 
                    <h1>Faça seu cadastro <br></br> e <span className="text-blue-500">acelere</span> suas reuniões</h1>
                    <img className="w-3xl" src="Remote meeting-bro.svg" ></img>
                </div>
            <div className="w-full lg:w-2/4 flex justify-center" >
            <form 
            onSubmit={handleSubmit}
            className="w-130
            bg-white/50 dark:bg-slate-900/50 
            backdrop-blur-xl 
            ring-2 ring-blue-400/90 dark:ring-blue-700/10 
            rounded-3xl 
            shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/10 flex flex-col items-center" >
                        <h1 className="mt-5 mb-6 uppercase font-bold text-3xl text-center items-center" >
                            Cadastre-se!
                        </h1>
                        <div className="flex flex-col w-3/4" >
                        <label >
                            Nome de usuário
                        </label>
                        <Input 
                        name="username"
                        onChange={handleChange}
                        type="text"
                        placeholder="Digite o nome de usuário"
                        className={`border p-2 rounded-md focus:outline-none ${
                        errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.username || ""}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                         <label >
                            Email
                        </label>
                        <Input 
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Digite o email do usuário"
                        className={`border p-2 rounded-md focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.email || ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                         <label >
                            Senha
                        </label>
                        <Input 
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Digite a senha"
                        className={`border p-2 rounded-md focus:outline-none ${
                        errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.password || ""}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                         <label >
                            Confirme a senha
                        </label>
                        <Input 
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        placeholder="Confirme a senha"
                        className={`border p-2 rounded-md focus:outline-none ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.confirmPassword || ""}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                         <button
  type="submit"
  data-slot="button"
  className="mb-3 mt-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md px-6 has-[&>svg]:px-4 gap-2 group bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
>
  Realizar o cadastro
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round" 
    className="lucide lucide-move-right h-4 w-4 transition-transform group-hover:translate-x-1"
    aria-hidden="true"
  ></svg>
</button>
                        <Link className="hover:underline underline-offset-1 text-center mb-3" href={"/login"}>Já possui uma conta? <span className="text-blue-500">Entre com ela</span></Link>
                        </div>

                </form>
            </div>
            <LoginConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => handleClose()}
                    title={"Cadastro"}
                    message={"Cadastro realizado com sucesso."}
                  />
             <div>
                    <img src="/Remote meeting-bro.svg" alt="Reunião remota" ></img>
                </div>
        </div>
    )
}

export default Register