import {NextApiRequest, NextApiResponse} from 'next';
import {createRouter} from "next-connect";
import {registerUser} from "@/server-side/controllers/user-controller";


const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(registerUser);

export default router.handler();