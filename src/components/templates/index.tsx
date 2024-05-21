"use client"
import React, { useCallback } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Footer from "./footer"; 
import Loading from "./loading";
const DynamicHeader = dynamic(() => import('./header'), {
  ssr: false,
})


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    return ( 
        <div className="relative min-h-screen">
            <Suspense fallback={<Loading/>}>
              <DynamicHeader/>
              <main className="mt-[50px] max-w-[1400px] mx-auto px-[20px] min-h-[calc(100vh-160px)] py-[40px]">
                {children}
              </main>
              <Footer/>
            </Suspense>
        </div>   
    );
  }
  