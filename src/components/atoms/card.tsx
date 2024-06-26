'use client';

export default function Card({ className, children }: { className: string; children: React.ReactNode }) {
   return (
      <div className={`${className} drop-shadow-[2px_2px_5px_rgba(0,0,0,0.16)] rounded-[7px]`}>
         {children}
      </div>
   );
}
