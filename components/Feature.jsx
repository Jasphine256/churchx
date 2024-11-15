import Image from "next/image"
import Link from "next/link"

const Feature = (props) => {
  return (
    <article className="w-full rounded-lg shadow-lg bg-white p-4 my-4 flex flex-row flex-wrap justify-between items-center transition ease-in hover:scale-105">
        <Image src={props.icon} alt="feature image" width={150} height={150} className="w-1/4"/>
        <div className="w-3/4 flex flex-col items-center justify-between">
        <h2 className="font-bold pt-3">{props.name}</h2>
        <Link href={props.url} className="text-gray-700 shadow-md p-1 px-4 my-4 rounded-full hover:bg-gray-200 hover:shadow flex">
            details
            <Image src={'/assets/icons/forward.svg'} alt="feature image" width={24} height={24} className="pl-4"></Image>
        </Link>
        </div>
    </article>
  )
}

export default Feature;