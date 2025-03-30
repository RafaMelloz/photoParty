import { FormSignIn } from "@/components/forms/form-signIn";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {  
    const session = await getServerSession(authOptions);
    
    if (session) {
        redirect("/home");
    }

    return (
        <section className="container h-screen mx-auto flex items-center justify-center">
            <FormSignIn/>
        </section>
    );
}