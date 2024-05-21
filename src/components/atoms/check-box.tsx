'use client';
import { useState } from 'react';

type CheckBoxType = {
    className?: string;
    id: string;
    name: string;
    label: string;
    value: boolean;
    onChange: (val: boolean) => void
}

export default function CheckBox({ className, id, label, name, value, onChange }: CheckBoxType) {

    return (
        <div className={`${className} flex justify-start items-center`}>
            <input
                type='checkbox'
                name={name}
                id={id}
                checked={value}
                onChange={() => onChange(value)}
                className='accent-primary-black-bg cursor-pointer transform scale-150'
            />
            {
                label != "" && 
                <label htmlFor={id} className='ml-[5px] text-xl cursor-pointer'>
                    {label}
                </label>
            }
        </div>
   );
}