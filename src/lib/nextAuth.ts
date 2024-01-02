import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import axios from "axios";

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials, req){
                const userCredentials = {
                    email: credentials?.email,
                    password: credentials?.password
                }
                const res = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`, userCredentials)
                const user = res.data
                if(user){
                    return user
                }
                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
        jwt: async ({token}) => {
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token?.email
                }
            })
            if(db_user){
                token.id = db_user.id
            }
            return token
        },
        session: ({session, token}) => {
            if(token){
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
            }
            return session
        }
    },
}

