'use client'
import Header from '@/components/Header'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Mainlayout = ({children}) => {
  return (
    <SessionProvider>
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-6">
        {children}
      </main>
    </div>
    </SessionProvider>
  )
}

export default Mainlayout