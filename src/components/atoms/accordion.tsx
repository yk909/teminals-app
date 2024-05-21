import { useState } from 'react';

type AccordionProps = {
    label?: React.ReactNode;
    children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-lg border-2 border-blue-500 p-4">
        <div className='flex justify-between items-center'>
            {
                label
            }
            <button
                className="flex justify-end items-center w-full p-4 focus:outline-none"
                onClick={toggleAccordion}
            >
                <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
        </div>
        <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            style={{ maxHeight: isOpen ? '2000px' : '0' }}
        >
            <div className="p-4">
                {children}
            </div>
        </div>
    </div>
  );
};

export default Accordion;
