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

  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen">
        <div>
          <p className="font-medium text-4xl">You have to login.</p>
          <div className="mt-3 text-center">
            <Link href="/" className="underline text-2xl">Go back</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative">
      <Layout>
        <App/>
      </Layout>
    </main>
  )
}

