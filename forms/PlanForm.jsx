'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

export const PlanForm = (props) => {

    const {data:session} = useSession()

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        handler:'',
        budget:'',
        status:'',
    })

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value,})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        try{
            const response = await fetch('/api/plans/new', {
                method:'POST',
                body:JSON.stringify({
                    creator:session.user.email,
                    name:formData.name,
                    description:formData.description,
                    handler:formData.handler,
                    budget:formData.budget,
                    status:formData.status,
                })
            })

            if (response.status === 201){
                console.log("Plan saved successfully")
                alert("Plan saved successfully")
            }else if(response.status===200){
                console.log("Plan already exists")
                alert("Plan already exists")
            }else{
                console.log("An error occurred")
                alert("An error occurred")
            }

        }catch(error){
            console.log(error)
        }

        console.log(formData)
        return true
    }

  return (
    <form className="w-full flex flex-col items-centerjustify-center" onSubmit={handleSubmit}>
        <div className="w-full py-1">
            <label htmlFor="title" className=" text-gray-800">Plan Name</label> <br />
            <input type="text" defaultValue={props.name} name="name" id="name" placeholder="Enter budget name" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="description" className=" text-gray-800">Description</label> <br />
            <textarea cols={10} rows={4} defaultValue={props.description} name="description" id="description" placeholder="Describe the budget" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="handler" className=" text-gray-800">Plan Handler</label> <br />
            <input type="text" name="handler" id="handler" defaultValue={props.handler} className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="total" className="text-gray-800">Budget Total</label> <br />
            <input type="text" defaultValue={props.budget} name="budget" id="budget" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="status" className=" text-gray-800">Status</label> <br />
            <input type="text" defaultValue={props.status} name="status" id="status" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full flex items-center justify-center p-2">
            <button type="submit" className="p-1 bg-blue-500 shadow rounded-full text-white px-4 cursor-pointer">Save</button>
        </div>
    </form>
  )
}
