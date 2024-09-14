'use client'
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import ListWidget3col from "./ListWidget3col";
import BaseModal from "./BaseModal";
import { VisitorForm } from "@forms/VisitorForm";

const VisitorView = () => {

    const {data:session} = useSession()

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [loading, setLoading] = useState(true)

    const [fetchedData, setFetchedData] = useState([{
        name:'',
        address:'',
        contact:'',
        email:'',
    }])
    
    const [formData, setFormData] = useState({
        name:'',
        address:'',
        contact:'',
        email:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = async (data) =>{
        if (data.type == 'visitor'){
            const response = await fetch(`/api/visitors/${data.id}`)
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
            address:'',
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
            const response = await fetch(`/api/visitors?${queryString}`)
            const data = await response.json()
            setFetchedData(data.message)
        }
        fetchData()
        setLoading(false)
    },[fetchTrigger])

    if(loading){
        return(<></>)
    }

  return (
    <div className="w-4/5 flex flex-col items-center justify-center">

        <section className="w-[78vw] m-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Visitors Database</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_member', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[78vh] overflow-y-auto overflow-x-hidden">
                {
                    fetchedData.map((visitor)=>(
                        <div className="w-full" key={visitor.id} onClick={()=>{openModal({type:'visitor', id:visitor.id})}}>
                            <ListWidget3col fields={['name', 'contact', 'address']} values={[visitor.name, visitor.contact, visitor.address]}/>
                        </div>
                    ))
                }
            </div>
        </section>
        <BaseModal title={'View/Edit Bio data'} isVisible={isModalVisible} onClose={closeModel}>
            <VisitorForm name={formData.name} email={formData.email} address={formData.address} contact={formData.contact}/>
        </BaseModal>
    </div>
  )
}

export default VisitorView;