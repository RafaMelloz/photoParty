import { Header } from "@/components/header";
import { authOptions } from "@/libs/auth";
import { AuthProvider } from "@/providers/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <Header session={session}/>
            <AuthProvider>
                <main className="container mx-auto">
                    {children}
                </main>
            </AuthProvider>
        </>
    );
}
