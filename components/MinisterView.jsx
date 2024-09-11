'use client'
import { useState } from "react";
import { useEffect } from "react";
import ListWidget from "./ListWidget";
import BaseModal from "./BaseModal";
import { MinisterForm } from "@forms/MinisterForm";

const MinisterView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [fetchedData, setFetchedData] = useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/ministers')
            const data = await response.json()
            setFetchedData(data)
        }
        fetchData()
    }, [fetchTrigger])

    const [formData, setFormData] = useState({
        name:'',
        role:'',
        ministry:'',
        contact:'',
        email:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'minister'){
            setFormData({
                name:'ABC',
                role:'abc',
                ministry:'Tech',
                contact:'0745201484',
                email:'mikhael@jasphine2611',
            })
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
    }

    const ministers = [
        {
            minister: 'Mikhael Jasper',
            ministry: 'Technology',
            role: 'Software Enginner',
            contact: '0783946667'
        },
        {
            minister: 'Jubilee Gold',
            ministry: 'Music',
            role: 'Team Lead',
            contact: '0783946667'
        },
        {
            minister: 'Sera Baibe',
            ministry: 'Media',
            role: 'Graphics Designer',
            contact: '0745201484'
        },
        {
            minister: 'Serungogi Henry',
            ministry: 'Media',
            role: 'Videography',
            contact: '0783946667'
        },
        {
            minister: 'Daphine Browe',
            ministry: 'Media',
            role: 'Journalism',
            contact: '0745201484'
        },
        {
            minister: 'Ssuna Bruno',
            ministry: 'MultiMedia',
            role: 'Production',
            contact: '0745201484'
        },
        {
            minister: 'Mikhael Jasper',
            ministry: 'Technology',
            role: 'Software Enginner',
            contact: '0783946667'
        },
        {
            minister: 'Jubilee Gold',
            ministry: 'Music',
            role: 'Team Lead',
            contact: '0783946667'
        },

    ]
  return (
    <div className="w-4/5 flex flex-col items-center justify-center">

        <section className="w-[78vw] m-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Ministers Database</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_minister', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[78vh] overflow-y-auto overflow-x-hidden">
                {
                    ministers.map((minister)=>(
                        <div className="w-full" key={minister.minister} onClick={()=>{openModal({type:'minister', id:minister.name})}}>
                            <ListWidget fields={['name', 'role', 'ministry', 'contact']} values={[minister.minister, minister.role, minister.ministry, minister.contact]}/>
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