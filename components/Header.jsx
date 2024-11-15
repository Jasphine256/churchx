'use client'
import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {useSession, signOut, signIn} from "next-auth/react"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: "Features", href:'/features', current: false},
  { name: 'About', href: '/about', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const {data:session} = useSession()

  return (
    <nav className="min-w-full fixed top-0 left-0 z-50">
    <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
            <div className="shrink-0">
                <Image src="/assets/images/CHURCHFLOW-LOGO.svg" width={100} height={100} alt="logo"/>
            </div>
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                    <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                    >
                    {item.name}
                    </a>
                ))}
                {
                    session?.user ? (
                        <Link href={'/dashboard'} className="text-white m-1">Dashboard</Link>
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
            </div>
            </div>
            </div>
            <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
            </div>
        </div>
        </div>

        <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
            <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
                )}
            >
                {item.name}
            </DisclosureButton>
            ))}
            {
                session?.user ? (
                    <Link href={'/dashboard'} className="text-white m-1">Dashboard</Link>
                ):(<></>)
            }
        </div>
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
        </DisclosurePanel>
    </Disclosure>
    
    </nav>
  )
}
