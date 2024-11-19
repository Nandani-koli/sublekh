import React from 'react'

const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout