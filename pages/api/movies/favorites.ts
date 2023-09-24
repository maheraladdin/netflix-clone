import {NextApiRequest, NextApiResponse} from "next";
import {without} from "lodash";
import prismaDb from "@/lib/prisma-db";
import serverAuth from "@/lib/server-auth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === "POST") {
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
        } else if(req.method === "DELETE") {
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
        } else if (req.method === "GET") {
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
        }
        return res.status(405).json({message: "Method not allowed"});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}