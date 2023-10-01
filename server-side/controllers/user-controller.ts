import nextRequestWrapper from "@/server-side/lib/next-request-wrapper";
import {NextApiRequest, NextApiResponse} from "next";
import serverAuth from "@/server-side/lib/server-auth";
import prismaDb from "@/lib/prisma-db";
import bcrypt from "bcrypt";

export const getCurrentUser = nextRequestWrapper(async (req: NextApiRequest, res: NextApiResponse) => {
    const {user} = await serverAuth(req,res);
    res.status(200).json({user});
})

export const registerUser = nextRequestWrapper(async (req: NextApiRequest, res: NextApiResponse) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) return res.status(422).json({message: "Invalid input"});

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
            emailVerified: new Date()
        }
    });

    res.status(201).json({message: "User created successfully", user});
});