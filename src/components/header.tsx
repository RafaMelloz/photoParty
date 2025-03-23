import Link from "next/link";

export function Header() {
    return(
        <header className="border-b border-amber-400/45 py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1>Header</h1>
                
                <ul className="flex gap-4 items-center">
                    <li className="rounded-full px-4 py-1.5 font-semibold">
                        <Link href={'/signIn'}>Entrar</Link>
                    </li>
                    <li className="bg-gold text-zinc-800 rounded-full px-4 py-1.5 font-semibold">
                        <Link href={'/signUp'}>Registrar-se</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}