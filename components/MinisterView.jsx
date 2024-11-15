'use client'
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import ListWidget from "./ListWidget";
import BaseModal from "./BaseModal";
import { MinisterForm } from "@forms/MinisterForm";

const MinisterView = () => {

    const {data:session} = useSession()

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [loading, setLoading] = useState(true)

    const [fetchedData, setFetchedData] = useState([{
        name:'',
        role:'',
        ministry:'',
        contact:'',
        email:'',
    }])
    
    const [formData, setFormData] = useState({
        name:'',
        role:'',
        ministry:'',
        contact:'',
        email:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = async (data) =>{
        if (data.type == 'minister'){
            const response = await fetch(`/api/ministers/${data.id}`)
            const recievedData = await response.json()
            setFormData(recievedData.message)
            setModalVisible(true)
        }else{
            setModalVisible(true)
        }
    }
    const closeModel = () =>{
        setFormData({
            name:'',
            role:'',
            ministry:'',
            contact:'',
            email:'',
        })
        setModalVisible(false)
        setFetchTrigger((prev)=>{prev+1})
    }
    
    useEffect(()=>{
        const fetchData = async () =>{
            const queryParams = {user:session?.user.email}
            const queryString = new URLSearchParams(queryParams).toString()
            const response = await fetch(`/api/ministers?${queryString}`)
            const data = await response.json()
            setFetchedData(data.message)
        }
        fetchData()
        setLoading(false)
    },[fetchTrigger])

    if (loading){
        return(<></>)
    }
  return (
    <div className="w-full flex flex-col items-center justify-center">

        <section className="w-full m-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Ministers Database</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_minister', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[78vh] overflow-y-auto overflow-x-hidden">
                {
                    fetchedData.map((minister)=>(
                        <div className="w-full" key={minister.id} onClick={()=>{openModal({type:'minister', id:minister.id})}}>
                            <ListWidget fields={['name', 'role', 'ministry', 'contact']} values={[minister.name, minister.role, minister.ministry, minister.contact]}/>
                        </div>
                    ))
                }
            </div>
        </section>
        <BaseModal title={'View/Edit Bio data'} isVisible={isModalVisible} onClose={closeModel}>
            <MinisterForm name={formData.name} role={formData.role} ministry={formData.ministry} contact={formData.contact} email={formData.email}/>
        </BaseModal>
    </div>
  )
}

export default MinisterView;