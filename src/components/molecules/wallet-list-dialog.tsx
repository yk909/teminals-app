import Image from "next/image";
import Modal from "../atoms/modal";
import { usePolkadotExtensionWithContext } from '@/context/polkadotExtensionContext';
import polkadotImage from '../../../public/polkadot-logo.svg';
import metamaskImage from '../../../public/metamask-logo.webp';


type WalletListDialogType = {
    open: boolean;
    onClose: () => void;
    onClickMetamaskLogin: () => void;
    onClickPolkadotLogin: () => void;
}

const WalletListDialog = ({ open, onClose, onClickMetamaskLogin, onClickPolkadotLogin } : WalletListDialogType) => {

    const { accounts, actingAccount, injector } = usePolkadotExtensionWithContext();

    return(
        <Modal isVisible={open} onClose={onClose} closable={false} className="p-5" footer={<></>} >
            <h3 className="text-xl font-bold text-black">Select Wallet</h3>
            <div className="mt-3 space-y-3 ">
                {         
                    window.ethereum ?           
                    <div onClick={onClickMetamaskLogin} 
                        className="border-[2px] rounded-sm px-5 py-3 flex justify-center items-center gap-x-3 cursor-pointer hover:border-pink-400 transition-all duration-300">
                        <Image src={metamaskImage} alt="Metamask" width={150} height={150} className="w-[50px] h-[50px]" />
                        <span className="text-lg font-medium text-black">
                            Metamask
                        </span>
                    </div>
                    :
                    <a href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                        className="border-[2px] rounded-sm px-5 py-3 flex justify-center items-center gap-x-3 cursor-pointer hover:border-pink-400 transition-all duration-300">
                        <Image src={metamaskImage} alt="Metamask" width={150} height={150} className="w-[50px] h-[50px]" />
                        <span className="text-lg font-medium text-black">
                            Install Metamask wallet
                        </span>
                    </a>
                }
                {
                    accounts && accounts.length > 0 ?
                    <div onClick={onClickPolkadotLogin} 
                        className="border-[2px] rounded-sm px-5 py-3 flex justify-center items-center gap-x-3 cursor-pointer hover:border-pink-400 transition-all duration-300">
                        <Image src={polkadotImage} alt="Metamask" width={150} height={150} className="w-[50px] h-[50px]" />
                        <span className="text-lg font-medium text-black">
                            Polkadot
                        </span>
                    </div>
                    :
                    <a href="https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn"
                        className="border-[2px] rounded-sm px-5 py-3 flex justify-center items-center gap-x-3 cursor-pointer hover:border-pink-400 transition-all duration-300">
                        <Image src={polkadotImage} alt="Metamask" width={150} height={150} className="w-[50px] h-[50px]" />
                        <span className="text-lg font-medium text-black">
                            Install Polkadot wallet
                        </span>
                    </a>

                }
                
            </div>
        </Modal>
    )
}

export default WalletListDialog;