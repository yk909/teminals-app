import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

interface CryptoNonceResponse {
  nonce: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CryptoNonceResponse>
) {
  try {
    const {publicAddress} = req.body;
    const nonce = crypto.randomBytes(32).toString("hex");

    await prisma.user.upsert({
      where: { publicAddress },
      create: {
        publicAddress,
        nonce
      },
      update: {
        nonce
      },
    });

    console.log(nonce)
    return res.status(200).json({nonce: nonce})
  } catch (error) {
    console.log(error)
    return res.status(400).json({nonce: ''})
  }
}