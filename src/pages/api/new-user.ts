import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { publicAddress } = req.body;
    
    try {
        const newUser = await getOrCreateUser(publicAddress);
        return res.status(200).json({user: newUser});

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(200).json({user: null});
    } 

}



async function getOrCreateUser(publicAddress: string) {
    let user = await prisma.user.findUnique({
        where: { publicAddress: publicAddress },
    });
  
    // If user doesn't exist, create it
    if (!user) {
        user = await prisma.user.create({
            data: {
                publicAddress: publicAddress,
            },
        });
    }
  
    return user;
}