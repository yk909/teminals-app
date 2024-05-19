"use client"

import React from "react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import comLogo from '../../../../public/commune-logo.png';
import WalletConnectButton from "@/components/atoms/wallet-button";
import WalletListDialog from "@/components/atoms/wallet-list-dialog";
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import { usePolkadotExtensionWithContext } from '@/context/polkadotExtensionContext';
import Loading from "../loading";
import { useRouter } from "next/router";
import { message } from "antd";
import { ethers } from "ethers";
import axios from "axios";


declare global {
    interface Window {
        ethereum?: any;
    }
}
  

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
            
            await axios.post('/api/new-user', {publicAddress});
            const response = await axios.post('/api/nonce', {publicAddress});
            const signedNonce = await signer.signMessage(response.data.nonce);

            await signIn("metamask", {
                publicAddress,
                signedNonce,
                callbackUrl: "/",
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
      
            // will return a promise https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
            const result = await signIn('polkadot', {
                redirect: false,
                callbackUrl: '/',
                message: JSON.stringify(message),
                name: actingAccount?.meta?.name,
                signature,
                address: actingAccount?.address,
            });
      
            // take the user to the protected page if they are allowed
            if (result?.url) {
                router.push('/');
            }

            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            message.error({content:String(error)})
          }

        setWalletDialogOpen(false);

    }




    return (
        <header className="pt-[20px] z-[99] top-5 max-w-[1400px] mx-auto w-full font-sans">
            <div className=" bg-[white] text-[#272727] dark:bg-[#161d28] dark:text-[#929191] rounded-[42px] py-[5px]
                            drop-shadow-[0px_6px_6px_rgba(0,0,0,0.25)] mx-[10px] sm:mx-[20px]">
                <div className="flex justify-between px-[20px]">
                    <Link href="/"
                        className="flex justify-start items-center group cursor-pointer">
                        {/* <Image src={comLogo} className="h-[55px]  w-[60px] md:w-[75px] md:h-[80px] group-hover:hue-rotate-180 duration-300 transition-all" width={150} height={150} alt="logo" /> */}
                        <h1 className="text-[24px] font-bold hidden sm:block">
                            TerminalApp
                        </h1>
                    </Link>
                    <div className="flex justify-center items-center">
                        <WalletConnectButton onClick={ () => setWalletDialogOpen(true)}/>
                    </div>
                </div>
            </div>    
            <WalletListDialog open={walletDialogOpen} onClickPolkadotLogin={onClickPolkadotLoginHandle} onClickMetamaskLogin={onClickMetamaskLoginHandle} />      
            {
                isLoading && <Loading/>
            }
        </header>
    )
}



export default Header;