import Image from "next/image";
import Link from "next/link";
import logoImage from '../../../../public/commune-logo.png';



const Footer = () => {
    return (
        <footer className="bg-custom-black p-[40px] md:p-[60px] lg:p-[100px]">
            <div className="flex justify-center items-center">
                <h2 className="text-[24px] font-bold">TerminalApp</h2>
            </div>
        </footer>
    )
}


export {Footer};