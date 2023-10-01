import {NextApiRequest, NextApiResponse} from "next";
import {createRouter} from "next-connect";
import {getMovieById} from "@/server-side/controllers/movies-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();


router.get(getMovieById);

export default router.handler();