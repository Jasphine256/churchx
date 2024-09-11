'use client'
import { useState } from "react";
import { useEffect } from "react";
import ListWidget from "./ListWidget";
import BaseModal from "./BaseModal";
import { VisitorForm } from "@forms/VisitorForm";

const VisitorView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [fetchedData, setFetchedData] = useState({})
    
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/visitors')
            const data = await response.json()
            setFetchedData(data)
        }
        fetchData()
    }, [fetchTrigger])

    const [formData, setFormData] = useState({
        name:'',
        address:'',
        contact:'',
        email:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'visitor'){
            setFormData({
                name:'ABC',
                address:'abc',
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
            address:'',
            contact:'',
            email:'',
        })
        setModalVisible(false)
    }

    const visitors = [
        {
            visitor: 'Mikhael Jasper',
            address: 'kampala',
            email: 'mikhael@jasphine.com',
            contact: '0783946667'
        },
        {
            visitor: 'Jubilee Gold',
            address: 'Salaama',
            email: 'gold@jasphine.com',
            contact: '0783946667'
        },
        {
            visitor: 'Sera Baibe',
            address: 'Makindye',
            email: 'janedoe@jasphine.com',
            contact: '0745201484'
        },
        {
            visitor: 'Serungogi Henry',
            address: 'Mukono',
            email: 'hen@jasphine.com',
            contact: '0783946667'
        },
        {
            visitor: 'Daphine Browe',
            address: 'Ndeeba',
            email: 'daphy@mikky.com',
            contact: '0745201484'
        },
        {
            visitor: 'Ssuna Bruno',
            address: 'Ndeeba',
            email: 'bruno@navi.com',
            contact: '0745201484'
        },
        {
            visitor: 'Mikhael Jasper',
            address: 'kampala',
            email: 'jasper@jasphine.com',
            contact: '0783946667'
        },
        {
            visitor: 'Jubilee Gold',
            address: 'Salaama',
            email: 'gold@jasphine.com',
            contact: '0783946667'
        },

    ]
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
                    visitors.map((visitor)=>(
                        <div className="w-full" key={visitor.email} onClick={()=>{openModal({type:'visitor', email:visitor.email})}}>
                            <ListWidget fields={['name', 'email', 'contact', 'address']} values={[visitor.visitor, visitor.email, visitor.contact, visitor.address]}/>
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