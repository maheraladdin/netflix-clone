import {NextApiRequest, NextApiResponse} from "next";

export default function nextRequestWrapper(
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
    statusCode: number,
    message: string) {
    return async (req:NextApiRequest, res:NextApiResponse) => {
        try {
            await handler(req, res);
        } catch (error) {
            return res.status(statusCode).json({
                error,
                message
            });
        }
    }
}