import serverAuth from "@/server-side/lib/server-auth";
import prismaDb from "@/lib/prisma-db";
import {NextApiRequest, NextApiResponse} from "next";
import nextRequestWrapper from "@/server-side/lib/next-request-wrapper";
import ServerAuth from "@/server-side/lib/server-auth";
import PrismaDb from "@/lib/prisma-db";


export const getMovies = nextRequestWrapper(async (req: NextApiRequest,res: NextApiResponse) => {
    await ServerAuth(req,res);
    const movies = await PrismaDb.movie.findMany({});
    res.status(200).json({
        movies,
        message: "Movies fetched successfully"
    });
});

export const getMovieById = nextRequestWrapper(async (req: NextApiRequest,res: NextApiResponse) => {
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
});

export const getRandomMovie = nextRequestWrapper(async (req: NextApiRequest,res: NextApiResponse) => {
    await serverAuth(req,res);
    const numberOfMovies = await prismaDb.movie.count();
    const randomMovie = await prismaDb.movie.findFirst({
        skip: Math.floor(Math.random() * numberOfMovies)
    });
    return res.status(200).json({
        randomMovie,
        message: "Random movie generated successfully"
    });
});

