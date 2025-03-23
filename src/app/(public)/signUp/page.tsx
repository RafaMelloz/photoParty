import { FormSignUp } from "@/components/forms/form-signUp";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

export default async function SignUp() {
    const session = await getServerSession(authOptions);
    const isLogged:boolean = session ? true : false;

    return (
       <section className="container h-screen mx-auto flex items-center justify-center">
            <FormSignUp logged={isLogged}/>
        </section>
    );
}