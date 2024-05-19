import Image from "next/image";
import { Divider, Modal } from "antd";
import { useState } from 'react';
import { usePolkadotExtensionWithContext } from '@/context/polkadotExtensionContext';
import polkadotImage from '../../../public/polkadot-logo.svg';



type AccountSelectorDialogType = {
    open: boolean;
    closeDialog: () => void;
}

const AccountSelectorDialog = ({ open, closeDialog } : AccountSelectorDialogType) => {

  const { accounts, actingAccount, setActingAccountIdx } = usePolkadotExtensionWithContext();



    return(
        <Modal open={open} closable={false} className="p-5" footer={<></>} >
            <h3 className="text-xl font-bold">Select Account</h3>
            <div className="mt-3 space-y-3 ">
              {
                accounts && accounts?.length > 0 && 
                accounts?.map((item, idx) => (
                  <div key={idx}
                    className="border-[2px] rounded-sm px-5 py-3 flex justify-center items-center gap-x-3 cursor-pointer hover:border-pink-400 transition-all duration-300">
                    <Image src={polkadotImage} alt="Metamask" width={150} height={150} className="w-[50px] h-[50px]" />
                    <span className="text-lg font-medium">
                      {item.address}
                    </span>
                </div>
                ))
              }
            </div>
        </Modal>
    )
}

export default AccountSelectorDialog;