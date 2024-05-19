import NextAuth, { NextAuthOptions, User, AuthOptions, RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";
import { ethers } from "ethers";
import {
  decodeAddress,
  signatureVerify,
  cryptoWaitReady,
} from "@polkadot/util-crypto";
import { ApiPromise, WsProvider } from "@polkadot/api";


async function authorizeWithMetamask(
  credentials: Record<"publicAddress" | "signedNonce", string> | undefined,
  req: Pick<RequestInternal, "body" | "headers" | "method" | "query">
) {
  try {
    if (!credentials) return null;

    const { publicAddress, signedNonce } = credentials;

    const user = await prisma?.user.findFirst({
      where: {
        publicAddress: publicAddress
      }
    })

    if(!user) return null;
    
    const verifyNonce = String(user?.nonce);
    const signerAddress = ethers.verifyMessage(verifyNonce, signedNonce);
  
    if (signerAddress !== publicAddress) return null;
  
    return {
      id: publicAddress,
      address: publicAddress,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}


async function authorizeWithPolkadot(
  credentials:
    | Record<"message" | "signature" | "address" | "csrfToken", string>
    | undefined
) {
  await cryptoWaitReady();

  if (!credentials) {
    return null;
  }

  const provider = new WsProvider("wss://kusama-rpc.polkadot.io/");
  const api = await ApiPromise.create({ provider });

  try {
    const messageHex = credentials.message;
    const messaageJSON = JSON.parse(messageHex);
    if (messaageJSON.uri !== process.env.NEXT_PUBLIC_NEXTAUTH_URL) {
      return Promise.reject(new Error("🚫 You shall not pass! - URI mismatch"));
    }

    if (messaageJSON.nonce !== credentials.csrfToken) {

      return Promise.reject(
        new Error("🚫 You shall not pass! - CSRF token mismatch")
      );
    }
    
    const publickKey = credentials.address;

    const { isValid } = signatureVerify(
      messageHex,
      credentials.signature,
      publickKey
    );

    if (!isValid) {
      return Promise.reject(new Error("🚫 Invalid Signature"));
    }

    return {
      id: credentials.address,
      address: credentials.address,
    };
  } catch (e) {
    console.error("Failed to parse message:", e);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "metamask",
      name: "MetamaskAuth",
      credentials: {
        publicAddress: { label: "Public Address", type: "text" },
        signedNonce: { label: "Signed Nonce", type: "text" },
      },
      authorize: authorizeWithMetamask,
    }),
    CredentialsProvider({
      id: 'polkadot',
      name: 'polkadotAuth',
      credentials: {
        address: {
          label: 'Address',
          type: 'text',
          placeholder: '0x0',
        },
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        csrfToken: {
          label: 'CSRF Token',
          type: 'text',
          placeholder: '0x0',
        },
        name: {
          label: 'Name',
          type: 'text',
          placeholder: 'name',
        },
      },
      authorize: authorizeWithPolkadot
    }),
  ],
  session: {
    strategy: 'jwt',
    // maxAge: 3, // uncomment to test session expiration in seconds
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    newUser: '/',
  },
};

export default NextAuth(authOptions);
