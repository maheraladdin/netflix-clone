import { NextApiRequest, NextApiResponse } from 'next'
import {createRouter} from "next-connect";
import {getCurrentUser} from "@/server-side/controllers/user-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(getCurrentUser);

export default router.handler();