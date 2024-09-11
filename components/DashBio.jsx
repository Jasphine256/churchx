'use client'
import {useSession} from 'next-auth/react'
import Image from 'next/image'

const DashBio = () => {
    const {data:session} = useSession()
  return (
    <section className="w-full flex flex-col justify-center items-center p-2 py-4 border-gray-400">
    <div className="w-[60px] h-[60px] m-1">
        <Image src={session.user.image} width={60} height={60} alt='profile image' className="rounded-full mr-3 aspect-square object-cover" objectFit="cover"></Image>
    </div>
    <h1 className="text-lg font-bold text-gray-800 py-1 text-center">{session.user.name}</h1>
        <h5 className="text-sm">{session.user.email}</h5>
    </section>
  )
}

export default DashBio