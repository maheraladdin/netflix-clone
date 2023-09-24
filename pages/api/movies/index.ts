import {NextApiRequest, NextApiResponse} from "next";
import PrismaDb from "@/lib/prisma-db";
import ServerAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") return res.status(405).json({message: "Method not allowed"});

    try {
        await ServerAuth(req);
        const movies = await PrismaDb.movie.findMany({});
        res.status(200).json({
            movies,
            message: "Movies fetched successfully"
        });
    } catch (e) {
        res.status(400).json({error: e});
    }
}