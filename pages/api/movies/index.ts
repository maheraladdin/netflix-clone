import {NextApiRequest, NextApiResponse} from "next";
import {getMovies} from "@/server-side/controllers/movies-controller";
import {createRouter} from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(getMovies);

export default router.handler();