import { useEffect, useState, ReactNode } from 'react';


interface ModalProps {
    className?: string;
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
    closable?: boolean;
}

const Modal: React.FC<ModalProps> = ({ className, isVisible, onClose, children, footer, closable }) => {
  const [showModal, setShowModal] = useState(isVisible);

    useEffect(() => {
        setShowModal(isVisible);
    }, [isVisible]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
        onClose();
    }, 300); 
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all ease-in-out duration-500 ${showModal ? "" : "hidden"}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity" onClick={handleClose}></div>
          <div className={`bg-[#fff] rounded-lg shadow-lg min-w-[350px] transform transition-transform `}>
            {
                closable &&
                <div className="flex justify-end p-6">
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 px-4 transition duration-150 ease-in-out"
                    >
                        <div className='relative group cursor-pointer'>
                            <div className='absolute h-1 w-5 bg-[#707070] transform rotate-45 group-hover:-rotate-45 group-hover:bg-primary transition-all duration-150'></div>
                            <div className='absolute h-1 w-5 bg-[#707070] transform -rotate-45 group-hover:rotate-45 group-hover:bg-primary transition-all duration-150'></div>
                        </div>
                    </button>
                </div>
            }
            
            <div className={`${className}`}>{children}</div>
            {
                footer
            }
          </div>
        </div>
    </>
  );
};

export default Modal;
