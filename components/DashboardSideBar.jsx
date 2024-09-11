import Link from "next/link"
import Image from "next/image";
import DashBio from "./DashBio";

const DashboardSideBar = () => {
  const links = [
    {
      name: 'Dashboard',
      url: '/dashboard'
    },
    {
      name: 'Tasks',
      url: '/dashboard/tasks'
    },
    {
      name: 'Budgets',
      url: '/dashboard/budgets'
    },
    {
      name: 'Plans',
      url: '/dashboard/plans'
    },
    {
      name: 'Projects',
      url: '/dashboard/projects'
    },
    {
      name: 'Ministers',
      url: '/dashboard/ministers'
    },
    {
      name: 'Members',
      url: '/dashboard/members'
    },
    {
      name: 'Visitors',
      url: '/dashboard/visitors'
    },
    {
      name: 'Finance',
      url: '/dashboard/finance'
    },
    {
      name: 'Broadcast',
      url: '/dashboard/broadcast'
    },
  ]
  return (
    <aside className="w-1/5 bg-white rounded-md shadow flex flex-col items-start justify-center mt-2">
    <DashBio/>
    <nav className="w-4/5 p-2 mt-2 m-auto flex flex-col items-start justify-center rounded-lg bg-blue-50">
        {
        links.map((link) =>(
            <Link href={link.url} key={link.url} className="w-full p-2 flex items-center justify-start transition delay-40 ease-in hover:scale-105">
            <Image src={'/assets/icons/edit.svg'} width={30} height={30} className="p-1 px-2" alt="icon"></Image>
            {link.name}
            </Link>
        ))
        }
    </nav>
    </aside>
  )
}

export default DashboardSideBar;