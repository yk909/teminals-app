import { useSession } from "next-auth/react"
import Link from "next/link"
import { BN } from '@polkadot/util';

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
          <p className="font-medium text-2xl">You have to login.</p>
          <div className="mt-3 text-center">
            <Link href="/" className="underline">Go back</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      Dashboard
    </main>
  )
}

