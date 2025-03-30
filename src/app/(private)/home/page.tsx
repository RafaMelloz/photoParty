"use client"

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import useStore from "@/providers/store/collections";

export default function Home(){

    const { data, status } = useSession();
    const { newColletion } = useStore();

    return(
        <section className="px-4 py-8">
            <h2 className="text-2xl font-semibold">
                Ola, {data?.user?.name}!
            </h2>

            {newColletion && (
                <div className="grid grid-cols-1 gap-4 mt-8">
                    <div className="gold-gradiente p-4 rounded-lg flex h-32 justify-between items-end cursor-pointer transition-transform duration-300 hover:-translate-y-2">
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

                    <div className="gold-gradiente p-4 rounded-lg flex h-32 justify-between items-end cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <span className="text-zinc-900 font-semibold">Album 2</span>
                    </div>
                </div>
            )}
        </section>
    )
}