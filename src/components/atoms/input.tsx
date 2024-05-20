'use client';

import { useState } from 'react';

type InputType = {
    label?: string;
    name: string;
    className?: string;
    placeholder?: string;
    value: string;
    setValue: (val: string) => void
}

export default function Input({ label, name, className, placeholder, value, setValue }: InputType) {
   return (
      <div className={`${className}`}>
            {
                label != "" && 
                <label htmlFor={name}>{label}</label>
            }
            <input
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                className={`mt-3 w-full font-sans border-[2px] border-[#CCC] hover:border-blue-500 focus:border-blue-500 duration-300 transition-all rounded-[7px] outline-none text-gray-500 text-[16px]
                                    py-[5px] px-[10px]`}
            ></input>
      </div>
   );
}