import Image from "next/image"

const ListWidget = (props) => {

  return (
    <article key={props.task} className="w-full p-2 px-4 border-b border-gray-300 bg-white flex flex-row items-center justify-between cursor-pointer transition hover:scale-105 hover:shadow-lg">
        <div className="w-2/6">
            <p className="text-sm text-blue-600">{props.fields[0]}</p>
            <h3 className="font-bold text-gray-800">{props.values[0]}</h3>
        </div>
        <div className="w-2/6">
            <p className="text-sm text-blue-600">{props.fields[1]}</p>
            <h3>{props.values[1]}</h3>
        </div>
        <div className="w-1/6">
            <p className="text-sm text-blue-600">{props.fields[2]}</p>
            <h3>{props.values[2]}</h3>
        </div>
        <div className="w-1/6">
            <p className="text-sm text-blue-600">{props.fields[3]}</p>
            <h3 className="text-red-700 font-bold">{props.values[3]}</h3>
        </div>
    </article>
  )}

export default ListWidget;