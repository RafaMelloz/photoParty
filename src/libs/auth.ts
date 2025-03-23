import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from 'next-auth/adapters';
import prisma from "./prisma";
import argon2 from "argon2";

interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date | null;
    password?: string;
    image?: string;
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: { email: credentials.email }
                }) as User | null;

                if (!user) throw new Error("Credenciais Inválidas!");                

                const pwMatch = await argon2.verify(user.password as string, credentials.password);

                if (!pwMatch) throw new Error("Credenciais Inválidas!");
                

                return user;  
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session }) {
            return session;
        }
    }
}

