import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next';
import prismaDb from "@/lib/prisma-db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({message: "Method not allowed"});

    try {
        const {name, email, password} = req.body;

        const isEmailUnique = await prismaDb.user.findUnique({
            where: {
                email
            }
        });

        if(isEmailUnique) return res.status(422).json({message: "Email already exists"});

        const hashedPassword = bcrypt.hashSync(password, 12);

        const user = await prismaDb.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                image: "",
                email_verified: new Date()
            }
        });
    } catch (error) {
        console.log(error);
    }

}