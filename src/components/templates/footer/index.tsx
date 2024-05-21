import Image from "next/image";
import comLogo from '../../../../public/commune-logo.svg';



const Footer = () => {
    const today = new Date;
    
    return (
        <footer className="p-[20px] md:p-[40px] lg:p-[60px] bg-black/30">
            <div className="text-center max-w-[1400px] mx-auto relative">
                <div className="mt-4 lg:mt-0 lg:absolute left-0 top-1/2 -translate-y-1/2 flex justify-start items-center gap-1 ">
                    <Image src={comLogo} className="h-[50px]  w-[50px] md:w-[75px] md:h-[75px]" width={150} height={150} alt="logo" />
                    <span className="text-lg md:text-3xl">
                        Commune AI
                    </span>
                </div>
                <h2 className="text-lg md:text-3xl font-bold">TerminalApp <span className="text-lg font-medium" >&copy;{today.getFullYear()} Commune AI</span></h2>
            </div>
        </footer>
    )
}


export default Footer;