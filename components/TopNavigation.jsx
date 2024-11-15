'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {useSession, signOut} from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: "Overview", href:'/dashboard', current: true},
  { name: 'Finance', href: '/dashboard/finance', current: false },``
]
const dropdownNavigations = [
    { name: 'Collections', href: '#', current: false },
    { name: 'People', href: '#', current: false },
]
const userNavigation = [
  { name: 'Settings', href: '/settings' },
  { name: 'Help', href: '/help' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TopNavigation() {

    const {data:session} = useSession()
    const user = {
        name: session?.user.name,
        email: session?.user.email,
        imageUrl:session?.user.image,
      }

  return (
    <nav className="min-w-full fixed top-0 left-0 z-50">
    <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
            <div className="shrink-0">
                <Image
                alt="logo"
                src="/assets/images/CHURCHFLOW-LOGO.svg"
                width={160}
                height={100}
                />
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
                    <Menu>
                            <MenuButton className={"rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-medium"} >Collections</MenuButton>
                            <MenuItems anchor="bottom end" className={"bg-gray-800 p-2 flex flex-col w-[10em] rounded-sm shadow-md"}>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/tasks">Tasks</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/plans">Plans</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/projects">Projects</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/budgets">Budgets</Link>
                                </MenuItem>
                            </MenuItems>
                    </Menu>
                    <Menu>
                            <MenuButton className={"rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-medium"} >People</MenuButton>
                            <MenuItems anchor="bottom end" className={"bg-gray-800 p-2 flex flex-col w-[10em] rounded-sm shadow-md"}>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/pastors">Pastors</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/ministers">Ministers</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/members">Members</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/visitors">Visitors</Link>
                                </MenuItem>
                            </MenuItems>
                    </Menu>
                </div>
            </div>
            </div>
            <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
                <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                    </MenuButton>
                </div>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    {userNavigation.map((item) => (
                    <MenuItem as="div" key={item.name}>
                        <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        >
                        {item.name}
                        </a>
                    </MenuItem>
                    ))}
                    <MenuItem as="div">
                        <button onClick={()=>signOut({callbackUrl:'/'})} className="bg-blue-400 rounded-full p-1 pl-4 pr-4 m-2 ml-3 text-white hover:bg-blue-500">
                            Sign Out
                        </button>
                    </MenuItem>
                </MenuItems>
                </Menu>
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
                    <Menu>
                            <MenuButton className={"rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-medium"} >Collections</MenuButton>
                            <MenuItems anchor="bottom end" className={"z-50 bg-gray-800 p-2 flex flex-col w-[10em] rounded-sm shadow-md"}>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/tasks">Tasks</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/plans">Plans</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/projects">Projects</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/budgets">Budgets</Link>
                                </MenuItem>
                            </MenuItems>
                    </Menu>
                    <Menu>
                            <MenuButton className={"rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-medium"} >People</MenuButton>
                            <MenuItems anchor="bottom end" className={"z-50 bg-gray-800 p-2 flex flex-col w-[10em] rounded-sm shadow-md"}>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/pastors">Pastors</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/ministers">Ministers</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/members">Members</Link>
                                </MenuItem>
                                <MenuItem className={"p-2 text-gray-300 text-sm font-medium"}>
                                    <Link href="/dashboard/visitors">Visitors</Link>
                                </MenuItem>
                            </MenuItems>
                    </Menu>
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
            <div className="shrink-0">
                <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
            </div>
            <div className="ml-3">
                <div className="text-base/5 font-medium text-white">{user.name}</div>
                <div className="text-sm font-medium text-gray-400">{user.email}</div>
            </div>
            <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
                <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                {item.name}
                </DisclosureButton>
            ))}
            </div>
        </div>
        </DisclosurePanel>
    </Disclosure>
    
    </nav>
  )
}
