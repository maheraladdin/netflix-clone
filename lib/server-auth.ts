import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import PrismaDb from "@/lib/prisma-db";

export default async function serverAuth(req: NextApiRequest,res: NextApiResponse) {
    const session = await getSession({req});
    if(!session || !session?.user?.email) throw res.status(401).json({message: "Unauthorized email"});

    const user = await PrismaDb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!user) throw res.status(401).json({message: "Unauthorized user"});

    return {user};
}