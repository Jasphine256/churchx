'use client'
import Link from "next/link";
import Image from "next/image";
import {useSession, signOut, signIn} from "next-auth/react"

const Header = () => {
    const {data:session} = useSession()
    
  return (
    <header className="w-full flex flex-row items-center justify-start">

        <nav className="w-4/5 flex flex-row justify-between items-center bg-white rounded-r-full shadow-lg mt-2">

            <div className="flex flex-row items-center justify-center ml-4">
                <Image src={'/assets/images/bars.svg'} alt='nav icon' width={30} height={30} className="mx-4 ml-2 hidden"/>
                <Image src={'/assets/images/logo.png'} alt='logo' width={110} height={60}/>
            </div>

            <Link href={'/'} className="text-gray-700 m-1">Home</Link>

            <Link href={'/about'} className="text-gray-700 m-1">About</Link>
            {
                session?.user ? (
                    <Link href={'/dashboard'} className="text-gray-700 m-1">Dashboard</Link>
                ):(<></>)
            }

            {
            session?.user ? (
                <div className="flex flex-row flex-nowrap mr-1 items-center justify-center">
                    <button onClick={()=>signOut({callbackUrl:'/'})} className="bg-blue-400 rounded-full p-1 pl-4 pr-4 m-2 ml-3 text-white hover:bg-blue-500">
                        Sign Out
                    </button>
                    <div className="w-[37px] h-[37px]">
                    <Image src={session?.user.image} width={35} height={35} alt="profile image" className="rounded-full mr-3 aspect-square object-cover" objectFit="cover"></Image>
                    </div>
                </div>
            ):(
                <div className="flex flex-row mr-1">
                    <button onClick={()=>signIn()} className="bg-blue-400 rounded-full p-1 pl-4 pr-4 m-2 ml-3 mr-3 text-white hover:bg-blue-500">
                        Sing In
                    </button>
                </div>
            )
            }
        </nav>

    </header>
  )
}

export default Header;