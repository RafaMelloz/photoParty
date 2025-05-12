'use client';

import { api } from "@/libs/api";
import { signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
};

export function FormSignUp({logged} : {logged: boolean}) {    

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async function (data) {
        const { name, email, password, passwordConfirm } = data;

        if (password !== passwordConfirm) {
            alert("As senhas não coincidem!");
            return;
        }

        const promisse = api.post("/api/user", {name, email, password});        
    }
    
    async function handleLogin() {
        if (logged) {
            await signOut({ redirect: false }); 
        }
        await signIn("google", { callbackUrl: "/home" }); 
    }

    return (
        <section className="w-full px-4 text-center max-w-sm">
            <h2 className="font-semibold text-2xl">Inscreva se com</h2>

            {logged && <span className="font-semibold">Você está logado!</span>}

            <button onClick={handleLogin} className="btn-google" type="button">
                <Image src="/assets/google.png" alt="Google" width={24} height={24} className="absolute left-2" />
                Entrar com o google
            </button>

            <span className="font-semibold">Ou usando seu e-mail</span>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                <input
                    className={errors.name ? "custom-input !border-red-400 placeholder:!text-red-400 p-3" : "custom-input p-3"}
                    placeholder="Nome"
                    {...register("name", { required: true })}
                />
                <input
                    className={errors.email ? "custom-input !border-red-400 placeholder:!text-red-400 p-3" : "custom-input p-3"}
                    placeholder="E-mail"
                    {...register("email", { required: true })}
                />
                <div className="flex gap-4">	
                    <input
                        className={errors.password ? "custom-input !border-red-400 placeholder:!text-red-400 p-3" : "custom-input p-3"}
                        placeholder="Senha"
                        {...register("password", { required: true })}
                    />
                    <input
                        className={errors.password ? "custom-input !border-red-400 placeholder:!text-red-400 p-3" : "custom-input p-3"}
                        placeholder="Confirme sua senha"
                        {...register("passwordConfirm", { required: true })}
                    />
                </div>
                <button type="submit" className="gold-gradiente py-1.5 rounded-md font-semibold text-xl text-zinc-800 hover:scale-105 transition duration-300">
                    Criar conta
                </button>
            </form>

            <span className="mt-2 block text-sm">
                Já tem uma conta?
                <Link href={'/signIn'} className="ml-1 decoration-1 text-amber-400">Entrar</Link>
            </span>
        </section>
    );
}