"use client"

import React from "react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import comLogo from '../../../../public/commune-logo.png';
import WalletConnectButton from "@/components/atoms/wallet-button";
import WalletListDialog from "@/components/molecules/wallet-list-dialog";
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import { usePolkadotExtensionWithContext } from '@/context/polkadotExtensionContext';
import Loading from "../loading";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";


declare global {
    interface Window {
        ethereum?: any;
    }
}

const NEXT_PUBLIC_BASIC_URL = process.env.NEXT_PUBLIC_BASIC_URL!;
  

const Header = () => {

    const [walletDialogOpen, setWalletDialogOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    const { accounts, actingAccount, injector } = usePolkadotExtensionWithContext();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const onClickMetamaskLoginHandle = async () => {
        setIsLoading(true);
        try {
            if (!window.ethereum) {
                window.alert("Please install MetaMask first.");
                return;
            }
    
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const publicAddress = await signer.getAddress();
            
            await axios.post(`${NEXT_PUBLIC_BASIC_URL}/api/new-user`, {publicAddress});
            const response = await axios.post(`${NEXT_PUBLIC_BASIC_URL}/api/nonce`, {publicAddress});
            const signedNonce = await signer.signMessage(response.data.nonce);

            await signIn("metamask", {
                publicAddress,
                signedNonce,
                callbackUrl: "/dashboard",
            });

            setWalletDialogOpen(false);
            setIsLoading(false);
        } catch (error) {
            console.log(error)   
            setIsLoading(false);
        }

    }


    const onClickPolkadotLoginHandle = async () => {
        try {
            setIsLoading(true);
            let signature = '';
            const message = {
                statement: 'Sign in with polkadot extension to Terminals-App',
                uri: window.location.origin,
                version: '1',
                nonce: await getCsrfToken(),
            };
      
            const signRaw = injector?.signer?.signRaw;
      
            if (!!signRaw && !!actingAccount) {
                // after making sure that signRaw is defined
                // we can use it to sign our message
                const data = await signRaw({
                    address: actingAccount.address,
                    data: JSON.stringify(message),
                    type: 'bytes',
                });
        
                signature = data.signature;
            }
      
            await axios.post(`${NEXT_PUBLIC_BASIC_URL}/api/new-user`, {publicAddress: actingAccount?.address});


            // will return a promise https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
            const result = await signIn('polkadot', {
                redirect: false,
                callbackUrl: '/dashboard',
                message: JSON.stringify(message),
                name: actingAccount?.meta?.name,
                signature,
                address: actingAccount?.address,
            });
      
            // take the user to the protected page if they are allowed
            if (result?.url) {
                router.push(`${NEXT_PUBLIC_BASIC_URL}/dashboard`);
            }

            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
          }

        setWalletDialogOpen(false);

    }

    const signOutClick = () => {
        signOut();
    }


    return (
        <header className="pt-[20px] z-[99] top-5 max-w-[1400px] mx-auto w-full font-sans">
            <div className=" bg-[white] text-[#272727] dark:bg-[#161d28] dark:text-[#929191] rounded-md py-[5px]
                            drop-shadow-[0px_6px_6px_rgba(0,0,0,0.25)] mx-[10px] sm:mx-[20px]">
                <div className="flex justify-between px-[20px] py-4">
                    <div className="flex justify-start items-center gap-5">
                        <Link href="/"
                            className="flex justify-start items-center group cursor-pointer">
                            {/* <Image src={comLogo} className="h-[55px]  w-[60px] md:w-[75px] md:h-[80px] group-hover:hue-rotate-180 duration-300 transition-all" width={150} height={150} alt="logo" /> */}
                            <h1 className="text-[24px] font-bold hidden sm:block">
                                TerminalApp
                            </h1>
                        </Link>
                        <Link href="/dashboard"
                            className="flex justify-start items-center group cursor-pointer">
                                Dashboard
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        {
                            !session ? 
                            <WalletConnectButton onClick={ () => setWalletDialogOpen(true)}/>
                            :
                            <button  onClick={signOutClick}
                                className="relative rounded-md h-[40px] w-[130px] overflow-hidden border border-pink-400 bg-white text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400">
                                <span className="relative z-10">Sign Out</span>
                            </button>
                        }
                    </div>
                </div>
            </div>    
            <WalletListDialog open={walletDialogOpen} onClose={ ()=> setWalletDialogOpen(false)} onClickPolkadotLogin={onClickPolkadotLoginHandle} onClickMetamaskLogin={onClickMetamaskLoginHandle} />      
            {
                isLoading && <Loading/>
            }
        </header>
    )
}



export default Header;