import Image from "next/image"
import comLogo from '../../../public/commune-logo.svg';

const Loading = () => {
    return (
        <div className="absolute top-0 left-0 z-[9999] flex justify-center items-center bg-[rgba(15,15,15,0.36)] w-full h-full">
            <div className="mt-[-400px]">
                <Image src={comLogo} className="w-[100px] h-[100px] animate-bounce duration-500 transition-all" width={300} height={300} alt="logo" />
            </div>
        </div>
    )
}


export default Loading;