type ButtonType = {
    className?: string;
    label: string;
    onClick: () => void
}


const Button = ({ label, className, onClick }: ButtonType) => {
    return (
        <button  onClick={onClick}
            className={` ${className} relative rounded-md h-[40px] w-[130px] overflow-hidden border border-pink-400 bg-gray-100 text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400`}>
            <span className="relative z-10">{label}</span>
        </button>
    )
}


export default Button;



