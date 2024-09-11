'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

export const TaskForm = (props) => {

    const {data:session} = useSession()

    const [formData, setFormData] = useState({
        title:'',
        description:'',
        handler:'',
        startDate:'',
        deadline:''
    })

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value,})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch('/api/tasks/new', {
                method:'POST',
                body:JSON.stringify({
                    creator:session.user.email,
                    title:formData.title,
                    description:formData.description,
                    handler:formData.handler,
                    startDate:formData.startDate,
                    deadline:formData.deadline,
                })
            })
            console.log(response)
            if (response.status===201){
                console.log("Task saved successfully")
                alert("Task saved successfully")
            }else if(response.status===200){
                console.log("Task already exists")
                alert("Task already exists")
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
            <label htmlFor="title" className=" text-gray-800">Task Title</label> <br />
            <input type="text" defaultValue={props.title} name="title" id="title" placeholder="Enter task title" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="description" className=" text-gray-800">Task Description</label> <br />
            <textarea cols={10} rows={4} defaultValue={props.description} name="description" id="description" placeholder="Describe the task" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="handler" className=" text-gray-800">Task Handler</label> <br />
            <input type="text" name="handler" id="handler" defaultValue={props.handler} className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="startDate" className="text-gray-800">Start date</label> <br />
            <input type="date" defaultValue={props.startDate} name="startDate" id="startDate" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="deadline" className=" text-gray-800">Deadline</label> <br />
            <input type="date" defaultValue={props.deadline} name="deadline" id="deadline" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full flex items-center justify-center p-2">
            <input type="submit" value="Save" className="p-1 bg-blue-500 shadow rounded-full text-white px-4 cursor-pointer"/>
            {/* <button type="submit" className="p-1 bg-blue-500 shadow rounded-full text-white px-4 cursor-pointer">Save</button> */}
        </div>
    </form>
  )
}
