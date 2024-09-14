'use client'
import ListWidget from "./ListWidget";
import BaseModal from "./BaseModal";
import { useState } from "react";
import { useEffect } from "react";
import { MemberForm } from "@forms/MemberForm";
import { useSession } from "next-auth/react";

const MemberView = () => {

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
        if (data.type == 'member'){
            const response = await fetch(`/api/members/${data.id}`)
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
            const queryParams = {user:session.user.email}
            const queryString = new URLSearchParams(queryParams).toString()
            const response = await fetch(`/api/members?${queryString}`)
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
    <div className="w-4/5 flex flex-col items-center justify-center">

        <section className="w-[78vw] mt-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Members Database</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_member', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[78vh] overflow-y-auto overflow-x-hidden">
                {
                    fetchedData.map((member)=>(
                        <div onClick={()=>{openModal({type:'member', id:member.id})}} className="w-full" key={member.id}>
                            <ListWidget fields={['name', 'email', 'contact', 'address']} values={[member.name, member.email, member.contact, member.address]}/>
                        </div>
                    ))
                }
            </div>
        </section>
        <BaseModal title={'View/Edit Bio data'} isVisible={isModalVisible} onClose={closeModel}>
            <MemberForm name={formData.name} address={formData.address} email={formData.email} contact={formData.contact}/>
        </BaseModal>
    </div>
  )
}

export default MemberView;