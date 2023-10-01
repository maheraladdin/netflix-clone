import {NextApiRequest, NextApiResponse} from "next";
import {getRandomMovie} from "@/server-side/controllers/movies-controller";
import {createRouter} from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(getRandomMovie);

export default router.handler();