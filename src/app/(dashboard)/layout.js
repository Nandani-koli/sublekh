import Header from '@/components/Header'
import SessionProvider from '@/components/auth/SessionProvider'
// import { getServerSession } from 'next-auth'


const Mainlayout = async({children}) => {

  // const session = await getServerSession();
  // const session = await auth();

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