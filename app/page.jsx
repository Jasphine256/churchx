import Link from "next/link"
import Image from "next/image"
import Feature from "@components/Feature"
import Header from "@components/Header"

const Home = () => {
  const features = [
    {
      name: 'Databases',
      url: '/features#databases-info',
      icon: '/assets/icons/database.png',
    },
    {
      name: 'Finance',
      url: '/features#finances-info',
      icon: '/assets/icons/finance.png',
    },
    {
      name: 'Broadcast',
      url: '/features#broadcast-info',
      icon: '/assets/icons/message.png',
    },
    {
      name: 'Projects',
      url: '/features#projects-info',
      icon: '/assets/icons/project.png',
    },
  ]
  return (
    <>
      <Header/>
      <section className="mt-10 w-full flex flex-col items-center justify-center p-10 ">
        <h1 className="text-4xl font-bold p-3">The Free Ultimate Management System for the</h1>
        <h1 className="text-4xl font-bold p-3">Church, simplifying God's work</h1>
        <h3 className="text-lg p-1">Managing Plans, Projects, finances, scheduling tasks, ministers,</h3>
        <h3 className="text-lg p-1">backed up database, broadcast messages and lots more</h3>
        <div className="p-2 mt-4 rounded-full shadow-md text-white bg-green-500 hover:bg-green-400 hover:shadow">
          <Link href={'/features'} className="px-6 flex flex-nowrap items-center justify-between">
            Get Started For FREE
            <Image src={'/assets/icons/forward.svg'} alt="feature image" width={27} height={27} className="pl-4"></Image>
          </Link>
        </div>
      </section>

      <section className="w-full p-2 flex flex-row flex-warp items-center justify-evenly overflow-x-scroll">
        {
          features.map((feature)=>(
            <div className="min-w-[280px] w-full lg:w-1/4 m-4" key={feature.name}>
              <Feature name={feature.name} url={feature.url} icon={feature.icon}/>
            </div>
          ))
        }
      </section>
    </>
  )
}

export default Home