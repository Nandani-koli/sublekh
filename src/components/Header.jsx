'use client'
import { PlusIcon, LogoutIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link';
import { useEffect } from 'react';

const Header = ({ userName, userImage }) => {

const {data : session, status} = useSession();

    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">

            <div className="flex items-center space-x-4">
                <img src={session?.user?.image} alt="User Profile" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-semibold">{session?.user?.name}</span>

                <button className="bg-red-600 p-2 rounded-full hover:bg-red-500"
                onClick={() => signOut({callbackUrl : '/login'})}>
                    <LogoutIcon className="h-5 w-5 text-white" />
                </button>
            </div>

            <div className="text-xl font-bold"><Link href={'/'}>Sublekh</Link></div>

            <Link href={'/editspace'} className="flex items-center bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-500">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Space
            </Link>
        </header>
    )
}

export default Header
