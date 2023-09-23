import {NextApiRequest, NextApiResponse} from "next";

import prismaDb from "@/lib/prisma-db";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({message: "Method not allowed"});

    try {
        await serverAuth(req);
        const numberOfMovies = await prismaDb.movie.count();
        const randomMovie = await prismaDb.movie.findFirst({
            skip: Math.floor(Math.random() * numberOfMovies)
        });
        return res.status(200).json({
            randomMovie,
            message: "Random movie generated successfully"
        });
    } catch (e) {
        return res.status(400).json({error: e});
    }
}