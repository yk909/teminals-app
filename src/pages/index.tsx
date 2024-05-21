import { useState } from "react";
import { useSession } from "next-auth/react"
import Link from "next/link"
import { BN } from '@polkadot/util';
import App from "@/components/organisms/app";
import Layout from "@/components/templates";

export default function Admin( { freeBalance } : { freeBalance : BN } ) : JSX.Element {
  const { data:session, status } = useSession({
    required: true,
    onUnauthenticated() {
      console.log( 'not authenticated yet', status )
    },
  })

  // if (status === "loading") {
  //   return (
  //     <main className="relative">
  //       <Layout>
  //         <div className="flex justify-center items-center">
  //           <p className="font-medium text-4xl">You have to login.</p>
  //         </div>
  //       </Layout>
  //     </main>
  //   )
  // }

  return (
    <main className="relative">
      <Layout>
        <App/>
      </Layout>
    </main>
  )
}

