'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    email: string,
    password: string,
};

export function FormSignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async function (data) {
        const promise = signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
    }

    async function handleLogin() {
        await signIn("google")
    }

    return (
        <section className="w-full px-4 text-center max-w-sm">
            <h2 className="font-semibold text-2xl">Entre em sua conta</h2>

            <button onClick={handleLogin} className="btn-google" type="button">
                <Image src="/assets/google.png" alt="Google" width={24} height={24} className="absolute left-2"/>
                Entrar com o google
            </button>

            <span className="font-semibold">Ou acesse com o seu e-mail</span>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                <div className="w-full">
                    <input 
                        className={errors.email ? "custom-input !border-red-400 placeholder:!text-red-400" : "custom-input"} 
                        placeholder="Seu email" 
                        {...register("email", { required: true })} 
                    />
                </div>
                <div className="w-full">
                    <input 
                        className={errors.password ? "custom-input !border-red-400 placeholder:!text-red-400" : "custom-input"}
                        placeholder="Sua senha"  
                        {...register("password", { required: true })} 
                    />
                    {/* {errors.password && <span className="text-red-400 !text-left block text-sm pl-1">Este campo é obrigatorio!</span>} */}
                </div>
                <button type="submit" className="gold-gradiente py-1.5 rounded-md font-semibold text-xl text-zinc-800 hover:scale-105 transition duration-300">
                    Entrar
                </button>
            </form>

            <span className="mt-2 block text-sm"
                >Não possui uma conta?
                <Link href={'/signUp'} className="ml-1 decoration-1 text-amber-400">Registre-se!</Link>    
            </span>
        </section>
    );
}