import LogoWhite from '@/components/Logo/LogoWhite'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return <>

        <div className="flex min-h-screen w-full justify-center items-center gap-2 text-4xl">
            <LogoWhite />
            <Loader2 size={30} className='animate-spin flex justify-center items-center' />
        </div>
    </>
}
