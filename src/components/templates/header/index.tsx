"use client"

import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import comLogo from '../../../../public/commune-logo.svg';
import Button from "@/components/atoms/button";
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
                callbackUrl: "/app",
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
                callbackUrl: '/app',
                message: JSON.stringify(message),
                name: actingAccount?.meta?.name,
                signature,
                address: actingAccount?.address,
            });
      
            // take the user to the protected page if they are allowed
            if (result?.url) {
                router.push(`${NEXT_PUBLIC_BASIC_URL}/app`);
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
                <div className="flex justify-between px-[20px] py-2">
                    <div className="flex justify-start items-center gap-5">
                        <Link href="/"
                            className="flex justify-start items-center group cursor-pointer">
                            <Image src={comLogo} className=" h-[50px]  w-[50px] md:w-[65px] md:h-[65px]" width={150} height={150} alt="logo" />
                            <h1 className="text-2xl md:text-4xl font-bold hidden sm:block">
                                TerminalApp
                            </h1>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center gap-3 md:gap-6">
                        <Button label="App" className="w-[60px] md:w-[80px]" onClick={ () => router.push('/app')}/>
                        {
                            !session ? 
                            <Button label="Wallet Connect" className="w-[130px]" onClick={ () => setWalletDialogOpen(true)}/>
                            :
                            <Button label="Sign Out" className="w-[80px] md:w-[120px]" onClick={signOutClick} />
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