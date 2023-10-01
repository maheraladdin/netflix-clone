import serverAuth from "@/server-side/lib/server-auth";
import prismaDb from "@/clint-side/lib/prisma-db";
import {NextApiRequest, NextApiResponse} from "next";
import nextRequestWrapper from "@/server-side/lib/next-request-wrapper";
import {without} from "lodash";

export const getFavorites = nextRequestWrapper(async (req: NextApiRequest,res: NextApiResponse) => {
    const {user} = await serverAuth(req,res);
    const favorites = await prismaDb.movie.findMany({
        where: {
            id: {
                in: user?.favoriteIds
            }
        }
    });
    return res.status(200).json({
        favorites,
        message: "Favorites fetched successfully"
    });
});

export const addToFavorites = nextRequestWrapper(async (req: NextApiRequest,res: NextApiResponse) => {
    const {user} = await serverAuth(req,res);
    const {movieId} = req.body;
    const existingMovie = await prismaDb.movie.findUnique({
        where: {
            id: movieId
        }
    });
    if(!existingMovie) return res.status(404).json({message: "Movie not found"});
    const UpdatedUser = await prismaDb.user.update({
        where: {
            id: user.id,
        },
        data: {
            favoriteIds: {
                push: movieId
            }
        }
    });
    return res.status(200).json({
        user: UpdatedUser,
        message: "Movie added to favorites successfully"
    });
});

export const removeFromFavorites = nextRequestWrapper(async (req: NextApiRequest,res: NextApiResponse) => {
    const {user} = await serverAuth(req,res);
    const {movieId} = req.body;
    const existingMovie = await prismaDb.movie.findUnique({
        where: {
            id: movieId
        }
    });
    if(!existingMovie) return res.status(404).json({message: "Movie not found"});
    const UpdatedUser = await prismaDb.user.update({
        where: {
            id: user.id,
        },
        data: {
            favoriteIds: {
                set: without(user.favoriteIds, movieId)
            }
        }
    });
    return res.status(200).json({
        user: UpdatedUser,
        message: "Movie removed from favorites successfully"
    });
});