import prisma from "@/libs/prisma";
import { hash } from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { name, email, password } = await req.json();

    try {
        
        const existingUser = await prisma.user.findFirst({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ message: 'Esse email ja esta em uso!' }, { status: 400 });
        }

        const hashedPassword = await hash(password);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: 'Usuario registrado com sucesso!' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Erro ao cadastrar usario' }, { status: 500 });
    }
}