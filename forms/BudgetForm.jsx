'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

export const BudgetForm = (props) => {

    const {data:session} = useSession()

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        handler:'',
        total:'',
        status:'',
    })

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value,})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    
        try {
            const response = await fetch('/api/budgets/new', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    creator: session.user.email,
                    name: formData.name, // Changed from title to name to match API expectations
                    description: formData.description,
                    handler: formData.handler,
                    total: formData.total, // Added total as it matches the API expectations
                    status: formData.status, // Added status as it matches the API expectations
                }),
            });
    
            console.log(response);
    
            if (response.status === 201) {
                console.log("Budget saved successfully")
                alert("Budget saved successfully")
            } else if (response.status === 200) {
                console.error('Budget Already exists');
                alert('Budget Already exists')
            } else {
                console.error('An error occurred');
                alert('An error occurred')
            }
    
        } catch (error) {
            console.log(error);
        }
    
        console.log(formData);
        return true;
    }
    

  return (
    <form className="w-full flex flex-col items-centerjustify-center" onSubmit={handleSubmit} method="POST">
        <div className="w-full py-1">
            <label htmlFor="title" className=" text-gray-800">Budget Name</label> <br />
            <input type="text" defaultValue={props.title} name="name" id="name" placeholder="Enter budget name" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="description" className=" text-gray-800">Description</label> <br />
            <textarea cols={10} rows={4} defaultValue={props.description} name="description" id="description" placeholder="Describe the budget" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="handler" className=" text-gray-800">Budget Handler</label> <br />
            <input type="text" name="handler" id="handler" defaultValue={props.handler} className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        <div className="w-full py-1">
            <label htmlFor="total" className="text-gray-800">Aggregate Total</label> <br />
            <input type="text" defaultValue={props.total} name="total" id="total" className="w-full p-1 bg-transparent border border-gray-400 rounded px-3 outline-0" onChange={handleChange}/>
        </div>
        {/* <div className="w-full flex items-center justify-center p-2">
            <Link href={'/'} download={'/'} className='w-full rounded p-1 bg-green-500 text-white cursor-pointer'>Download Budget</Link>
        </div> */}
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
