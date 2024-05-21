import React from 'react';

interface Props {
  className?: string;
  name: string;
  label: string;
  value: number;
  setValue: (val: number) => void;
}

const NumberInput: React.FC<Props> = ({className, name, label, value, setValue }) => {

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue((value > 0 ? value - 1 : 0));
  };

  return (
    <div className={className} >
      {
        label != "" && 
        <label htmlFor={name} className='text-xl'>{label}</label>
      }
      <div id={name} className="mt-3 w-full flex justify-between items-center gap-x-1 bg-white border-2 border-gray-200  hover:border-blue-500 duration-300 transition-all rounded-[7px]">
        <div className="grow py-[5px] px-[10px]">
          <input className="w-full p-0 outline-none bg-transparent border-0 text-gray-800 focus:ring-0 text-xl" type="text" value={value} readOnly />
        </div>
        <div className="flex p-[2px] items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200 ">
          <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " onClick={handleDecrement}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " onClick={handleIncrement}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
