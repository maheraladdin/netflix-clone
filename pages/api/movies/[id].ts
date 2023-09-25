import {NextApiRequest, NextApiResponse} from "next";
import prismaDb from "@/lib/prisma-db";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") return res.status(405).json({message: "Method not allowed"});

    try {
        await serverAuth(req,res);
        const {id} = req.query;
        const movie = await prismaDb.movie.findUnique({
            where: {
                id: id as string
            }
        });
        if(!movie) return res.status(404).json({message: "Movie not found"});
        return res.status(200).json({
            movie,
            message: "Movie retrieved successfully"
        });
    } catch (e) {
        return res.status(400).json({error: e});
    }
}