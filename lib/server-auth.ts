import {NextApiRequest, NextApiResponse} from "next";
import PrismaDb from "@/lib/prisma-db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth";

export default async function serverAuth(req: NextApiRequest,res: NextApiResponse) {
    const session = await getServerSession(req,res, authOptions);

    if(!session || !session?.user?.email) throw res.status(401).json({message: "Unauthorized email"});

    const user = await PrismaDb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!user) throw res.status(401).json({message: "Unauthorized user"});

    return {user};
}