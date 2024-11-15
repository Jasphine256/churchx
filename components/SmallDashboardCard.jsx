import Image from "next/image";

const SmallDashboardCard = (props) => {
  return (
    <article key={props.name} className="w-full p-3 rounded-md shadow bg-white flex flex-row flex-wrap items-center justify-evenly">
        <Image src={props.icon} width={100} height={100} className="w-1/5 hidden md:block " alt="card image"></Image>
        <h1 className="font-bold text-blue-500 text-3xl">{props.value}</h1>
        <h3 className="font-bold text-gray-800 text-lg">{props.name}</h3>
    </article>
  )
}

export default SmallDashboardCard;