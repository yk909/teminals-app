'use client';

import { useState } from 'react';

type SelectType = {
    label?: string;
    name: string;
    className?: string;
    value: string;
    valueItems: string[];
    setValue: (val: string) => void
}

export default function Select({ label, name, className, value, valueItems, setValue }: SelectType) {
   return (
      <div className={`${className}`}>
            {
                label != "" && 
                <label htmlFor={name} className='text-lg'>{label}</label>
            }
            <select
                id={name}
                value={value}
                onChange={e => setValue(e.target.value)}
                className={`mt-3 w-full font-sans border-[2px] border-[#CCC] hover:border-blue-500 focus:border-blue-500 duration-300 transition-all rounded-[7px] outline-none text-gray-500 text-xl
                                    py-[5px] px-[10px]`}
            >
                {
                    valueItems.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
      </div>
   );
}