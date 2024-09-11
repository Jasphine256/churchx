'use client'

import { useState } from "react"

const BroadCastForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        message: '',
        recipients: 'ministers',
    })

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here, you could send formData to an API or handle it as needed.
    };

  return (
    <div className="w-4/5 p-4 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-1/2 shadow rounded-lg mt-10">
            <div className=" w-full flex items-center justify-center bg-green-500 p-4 rounded-t-lg text-white font-bold">
                <h1>Broadcast Message</h1>
            </div>
            <div className="w-full p-4">
                <label htmlFor="broadcast-title" className="w-full">Message Title</label>
                <input name="broadcast-title" type="text" value={formData.title} onChange={handleChange} className="w-full rounded p-1 border outline-0 border-blue-300 my-1 bg-blue-50"/>
            </div>
            <div className="w-full p-4">
                <label htmlFor="broadcast-message" className="w-full">Content</label> <br />
                <textarea name="broadcasr-message" cols="30" rows="4" value={formData.message} onChange={handleChange} className="w-full rounded p-1 border outline-0 border-blue-300 my-1 bg-blue-50"></textarea>
            </div>
            <div className="w-full p-4">
                <p className="w-full">Select recipients</p>
                <input type="checkbox" checked name="recipients" id="ministers-check" value={'ministers'} onChange={handleChange} className="mr-1"/>
                <label htmlFor="ministers-check" className=""> Ministers</label> <br />

                <input type="checkbox" name="recipients" id="members-check" value={'members'} onChange={handleChange} className="mr-1"/>
                <label htmlFor="members-check" className=""> Members</label> <br />

                <input type="checkbox" name="recipients" id="visitors-check" value={'visitors'} onChange={handleChange} className="mr-1"/>
                <label htmlFor="visitors-check" className=""> Visitors</label> <br />
            </div>
            <div className=" w-full flex items-center justify-center">
                <input type="submit" value="Send Message" className="w-full bg-blue-500 p-1  text-white font-bold hover:shadow-lg hover:bg-blue-600 cursor-pointer"/>
            </div>
        </form>
    </div>
  )
}

export default BroadCastForm