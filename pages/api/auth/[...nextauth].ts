import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismaDb from "@/lib/prisma-db";
import {compare} from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
            authorization : {
                params : {
                    scope : [
                        'email', 'ads_read', 'ads_management', 'public_profile', 'business_management', 'read_insights'
                    ].join(' ')
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
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

                if(!(credentials?.email || credentials?.password)) throw new Error("Email & password are required");

                const user = await prismaDb.user.findUnique({
                    where: {
                        email: credentials!.email
                    }
                })

                if(!(user || user!.password)) throw new Error("Invalid email or password");

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
    adapter: PrismaAdapter(prismaDb),
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)