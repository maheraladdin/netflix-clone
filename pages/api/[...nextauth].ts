import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismaDb from "@/lib/prisma-db";
import {compare} from "bcrypt";

export default NextAuth({
    providers: [
        Credentials({
            id: 'credentials',
            name: `Credentials`,
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if(credentials?.email || credentials?.password) throw new Error("Email & password are required");

                const user = await prismaDb.user.findUnique({
                    where: {
                        email: credentials!.email
                    }
                })

                if(user || user!.password) throw new Error("Invalid email or password");

                const isValid = await compare(credentials!.password, user!.password as string);

                if(!isValid) throw new Error("Invalid email or password");

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
})