import {NextApiRequest, NextApiResponse} from "next";
import {createRouter} from "next-connect";
import {addToFavorites, getFavorites, removeFromFavorites} from "@/server-side/controllers/favorites-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
    .get(getFavorites)
    .post(addToFavorites)
    .delete(removeFromFavorites);

export default router.handler();