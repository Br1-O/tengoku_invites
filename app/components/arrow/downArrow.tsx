import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const DownArrow = ({ href }: { href: string }) => {
    return (
    
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:brightness-110">
        <Link href={href}>
            <ArrowDown className='h-10 w-10 p-1 text-white bg-[var(--red-dark)] bg-opacity-75 rounded-full hover:brightness-125' />
        </Link>
    </div>
    )
}

export default DownArrow;

    
    
