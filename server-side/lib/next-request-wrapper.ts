import {NextApiRequest, NextApiResponse} from "next";

export default function nextRequestWrapper(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async (req:NextApiRequest, res:NextApiResponse) => {
        try {
            await handler(req, res);
        } catch (error) {
            return res.status(400).json({error});
        }
    }
}