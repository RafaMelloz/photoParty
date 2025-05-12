"use client"

import { Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useStore from "@/providers/store/collections";
import { SubmitHandler, useForm } from "react-hook-form";
    

type Inputs = {
    name: string,
    desc: string,
};

export default function Home(){
    const { data } = useSession();
    const { newColletion } = useStore();
    const [openModal, setOpenModal] = useState(false)
      const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCLoseModal = () => {
        setOpenModal(false);
    }

    const onSubmit: SubmitHandler<Inputs> = async function (data) {
        console.log(register("name")); 
    }

    return(
        <section className="px-4 py-8">
            <h2 className="text-2xl font-semibold">
                Ola, {data?.user?.name}!
            </h2>

            {newColletion && (
                <div className="grid grid-cols-1 gap-4 mt-8">
                    <div onClick={handleOpenModal} className="gold-gradiente p-4 rounded-lg flex h-32 justify-between items-end cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <span className="text-zinc-900 font-semibold">Nova coleção</span>
                        <Plus size={32} className="bg-zinc-900/80 rounded-full" />
                    </div>
                </div>
            )}

            {!newColletion && (
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="gold-gradiente p-4 rounded-lg flex h-32 justify-between items-end cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <span className="text-zinc-900 font-semibold">Album 1</span>
                    </div>

                    <label htmlFor="">

                    </label>

                    <div className="gold-gradiente p-4 rounded-lg flex h-32 justify-between items-end cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <span className="text-zinc-900 font-semibold">Album 2</span>
                    </div>
                </div>
            )}


            {openModal && (
                <div className="flex fixed inset-0 items-center justify-center bg-black/50 z-50 text-zinc-100">
                    <form className="bg-neutral-800 p-4 rounded-lg shadow-lg min-w-md" onSubmit={handleSubmit(onSubmit)}>
                        {/* HEADER MODAL */}
                        <div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Criar nova coleção</h3>
                                <button onClick={handleCLoseModal} className="cursor-pointer"><X /></button>
                            </div>

                            <span className="text-sm text-zinc-500">
                                Adicione o nome e a descrição da sua nova coleção.
                            </span>
                        </div>

                        {/* BODY MODAL */}
                        <div className="py-4 flex flex-col gap-2">	
                            <label htmlFor="name">
                                Nome
                                <input
                                    className={errors.name ? "custom-input !border-red-400 placeholder:!text-red-400 p-2" : "custom-input p-2"}
                                    {...register("name", { required: true })} name="name"
                                />
                            </label>

                            <label htmlFor="desc">
                                Descrição
                                <textarea 
                                    className={errors.name ? "custom-input !border-red-400 placeholder:!text-red-400 p-2" : "custom-input p-2"}
                                    {...register("desc", { required: true })} name="desc"
                                ></textarea>
                            </label>
                        </div>


                        {/* HEADER FOOTER */}
                        <div className="flex justify-end items-center gap-2 font-semibold">
                            <button onClick={handleCLoseModal} className="border border-zinc-800 py-1 px-2 rounded-md">Cancelar</button>
                            <button type="submit" className="border border-zinc-800 py-1 px-2 rounded-md">Salvar</button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    )
}