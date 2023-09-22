import {NextApiRequest} from "next";
import {getSession} from "next-auth/react";
import PrismaDb from "@/lib/prisma-db";

export default async function serverAuth(req: NextApiRequest) {
    const session = await getSession({req});

    if(!session || !session?.user?.email) throw new Error("Unauthorized");

    const user = await PrismaDb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!user) throw new Error("Unauthorized");

    return {user};
}