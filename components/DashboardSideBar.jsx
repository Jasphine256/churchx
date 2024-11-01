import Link from "next/link"
import Image from "next/image";
import DashBio from "./DashBio";

const DashboardSideBar = () => {
  const links = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon:'/assets/icons/dash-dash.png'
    },
    {
      name: 'Tasks',
      url: '/dashboard/tasks',
      icon:'/assets/icons/dash-task.png'
    },
    {
      name: 'Budgets',
      url: '/dashboard/budgets',
      icon:'/assets/icons/dash-budget.png'
    },
    {
      name: 'Plans',
      url: '/dashboard/plans',
      icon:'/assets/icons/dash-plan.png'
    },
    {
      name: 'Projects',
      url: '/dashboard/projects',
      icon:'/assets/icons/dash-project.png'
    },
    {
      name: 'Ministers',
      url: '/dashboard/ministers',
      icon:'/assets/icons/dash-minister.png'
    },
    {
      name: 'Members',
      url: '/dashboard/members',
      icon:'/assets/icons/dash-member.png',
    },
    {
      name: 'Visitors',
      url: '/dashboard/visitors',
      icon:'/assets/icons/dash-visitor.png'
    },
    {
      name: 'Finance',
      url: '/dashboard/finance',
      icon:'/assets/icons/dash-finance.png'
    },
    {
      name: 'Broadcast',
      url: '/dashboard/broadcast',
      icon:'/assets/icons/dash-broadcast.png'
    },
    {
      name: 'Settings',
      url: '/dashboard/settingspage',
      icon:'/assets/icons/settings.png'
    },
  ]
  return (
    <aside className="w-1/5 bg-white rounded-md shadow flex flex-col items-start justify-center mt-2">
    <DashBio/>
    <nav className="w-4/5 p-2 m-auto flex flex-col items-start justify-center rounded-lg bg-blue-50">
        {
        links.map((link) =>(
            <Link href={link.url} key={link.url} className="w-full p-2 flex items-center justify-start transition delay-40 ease-in hover:scale-105">
              <Image src={link.icon} width={30} height={30} className="p-1 px-2" alt="icon"></Image>
              {link.name}
            </Link>
        ))
        }
    </nav>
    </aside>
  )
}

export default DashboardSideBar;