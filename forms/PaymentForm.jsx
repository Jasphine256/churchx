'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

export const PaymentForm = (props) => {

    const {data:session} = useSession()

    const [formData, setFormData] = useState({
        name:'',
        date:'',
        reason:'',
        amount:'',
    })

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value,})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch('/api/transactions/new', {
                method:'POST',
                body:JSON.stringify({
                    creator:session.user.email,
                    type:props.type,
                    name:formData.name,
                    date:formData.date,
                    reason:formData.reason,
                    amount:formData.amount,
                })
            })

            if (response.status === 201){
                console.log(props.type+" saved successfully")
                alert(props.type+" saved successfully")
            }else if(response.status===200){
                console.log(props.type+" already exists")
                alert(props.type+" already exists")
            }else if(response.status === 500){
                console.log("An error occurred")
                alert("An error occurred ohhhh")
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
            <label htmlFor="name" className=" text-gray-800">{props.type} To/From</label> <br />
            <input type="text" defaultValue={props.name} name="name" id="name" placeholder="Enter Member name" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="reason" className=" text-gray-800">Reason</label> <br />
            <textarea cols="10" rows="4" defaultValue={props.reason} name="reason" id="reason" placeholder="Reason" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}></textarea>
            <input type="text" />
        </div>
        <div className="w-full py-1">
            <label htmlFor="date" className="text-gray-800">Date</label> <br />
            <input type="date" defaultValue={props.date} name="date" id="date" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="amount" className="text-gray-800">Amount</label> <br />
            <input type="text" defaultValue={props.amount} name="amount" id="amount" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full flex items-center justify-center p-2">
            <button type="submit" className="p-1 bg-blue-500 shadow rounded-full text-white px-4 cursor-pointer">Finish</button>
        </div>
    </form>
  )
}
