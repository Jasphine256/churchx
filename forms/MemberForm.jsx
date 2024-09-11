'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

export const MemberForm = (props) => {

    const {data:session} = useSession()

    const [formData, setFormData] = useState({
        name:'',
        address:'',
        contact:'',
        email:'',
    })

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value,})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        try{
            const response = await fetch('/api/members/new', {
                method:'POST',
                body:JSON.stringify({
                    creator:session.user.email,
                    name:formData.name,
                    address:formData.address,
                    contact:formData.contact,
                    email:formData.email,
                })
            })
            console.log(response)
            if (response.status===201){
                console.log("Member saved successfully")
                alert("Member saved successfully")
            }else if(response.status===200){
                console.log("Member already exists")
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
            <label htmlFor="name" className=" text-gray-800">Minister Name</label> <br />
            <input type="text" defaultValue={props.name} name="name" id="name" placeholder="Enter Member name" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="address" className=" text-gray-800">Address</label> <br />
            <input type="text" defaultValue={props.address} name="address" id="address" placeholder="Address" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="contact" className="text-gray-800">Contact</label> <br />
            <input type="text" defaultValue={props.contact} name="contact" id="contact" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="email" className="text-gray-800">Email</label> <br />
            <input type="text" defaultValue={props.email} name="email" id="email" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full flex items-center justify-center p-2">
            <button type="submit" className="p-1 bg-blue-500 shadow rounded-full text-white px-4 cursor-pointer">Save</button>
        </div>
    </form>
  )
}
