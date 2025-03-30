'use client'

import Link from "next/link";
import { Session } from "next-auth";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import useStore from "@/providers/store/collections";

export function Header({ session }: { session: Session | null }) {

    function logOut() {
        signOut({ callbackUrl: '/',  }); 
    }

    const { switchStatusCollection, newColletion } = useStore();

    return(
        <header className="border-b border-amber-400/45 p-4">
            {!session && (
                <nav className="container mx-auto flex justify-between items-center">
                    <h1></h1>
                    <ul className="flex gap-4 items-center">
                        <li className="rounded-lg px-4 py-1.5 font-semibold">
                            <Link href={'/signIn'}>Entrar</Link>
                        </li>
                        <li className="gold-gradiente text-zinc-800 rounded-lg px-4 py-1.5 font-semibold">
                            <Link href={'/signUp'}>Registrar-se</Link>
                        </li>
                    </ul>
                </nav>
            )}

            {session && (
                <>
                    <nav className="container mx-auto flex justify-between items-center">
                        {
                            session.user?.image ? (
                                <button className="cursor-pointer">
                                    <img src={session.user.image} alt="User" className="w-10 h-10 rounded-full" />
                                </button>
                            ) : (
                                <button className="border border-zinc-100/50 text-zinc-100 rounded-full p-2 cursor-pointer">
                                    <User size={18} />
                                </button>
                            )
                        }

                        <h1 className="font-bold">LOGO</h1>

                        <button className="border border-zinc-100/50 text-zinc-100 rounded-full p-2 cursor-pointer" onClick={logOut}>
                            <LogOut size={18} />
                        </button>
                    </nav>

                    <aside className="flex justify-around gap-10 mt-8">
                        <button 
                            onClick={() => switchStatusCollection(true)} 
                            className={`cursor-pointer text-sm selector ${newColletion ? 'active' : ''}`}>
                            Novo album
                        </button>
                        <button 
                            onClick={() => switchStatusCollection(false)} 
                            className={`cursor-pointer text-sm selector ${!newColletion ? 'active' : ''}`}>
                            Meus albums 
                        </button>
                    </aside>
                </>
            )}    
        </header>
    )
}