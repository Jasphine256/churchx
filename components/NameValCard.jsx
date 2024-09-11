const NameValCard = (props) => {
  return (
    <article key={props.name} className="w-full p-3 rounded-md shadow bg-white flex flex-row flex-wrap items-center justify-evenly">
      <h1 className="font-bold text-gray-800 text-lg">{props.name}</h1>
      <h3 className="font-bold text-blue-500 text-2xl">{props.value}</h3>
    </article>
  )
}

export default NameValCard;