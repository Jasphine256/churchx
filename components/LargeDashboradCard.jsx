import Image from "next/image"

const LargeDashboradCard = (props) => {
  return (
    <article key={props.name} className="w-full p-3 rounded-lg shadow bg-white flex flex-row flex-wrap items-center justify-center">
        <Image src={props.icon} width={90} height={90} className="hidden md:block w-1/3" alt="card image"></Image>
        <div className="w-1/2 h-full p-2 flex flex-col items-center justify-center">
            <h3 className="font-bold text-black text-md lg:text-xl">{props.name}</h3>
            <h1 className="font-bold text-blue-500 text-xl lg:text-5xl">{props.value}</h1>
        </div>
    </article>
  )
}

export default LargeDashboradCard;