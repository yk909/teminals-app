import { useState } from "react";
import { useSession } from "next-auth/react"
import Link from "next/link"
import { BN } from '@polkadot/util';
import Modal from "@/components/atoms/modal";


export default function Admin( { freeBalance } : { freeBalance : BN } ) : JSX.Element {
  const { data:session, status } = useSession({
    required: true,
    onUnauthenticated() {
      console.log( 'not authenticated yet', status )
    },
  })

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);


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
    <main className="relative">
     <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
      >
        Open Modal
      </button>

        <Modal className="" isVisible={isModalVisible} onClose={closeModal} closable>
          <h2 className="text-xl mb-4">This is the Modal Content</h2>
          <p>Here you can put any content you like.</p>
        </Modal>
    </main>
  )
}

