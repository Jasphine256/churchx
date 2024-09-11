'use client'
import { useState } from "react"
import { useEffect } from "react"
import SmallDashboardCard from "./SmallDashboardCard"
import ListWidget from "./ListWidget"
import BaseModal from "./BaseModal"
import { PlanForm } from "@forms/PlanForm"

const PlanView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [fetchedData, setFetchedData] = useState({})
    
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/plans')
            const data = await response.json()
            setFetchedData(data)
        }
        fetchData()
    }, [fetchTrigger])

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        handler:'',
        budget:'',
        status:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'plan'){
            setFormData({
                name:'ABC',
                description:'abc',
                handler:'mikky',
                budget:'100,000',
                status:'Pending',
            })
            setModalVisible(true)
        }else{
            setModalVisible(true)
        }
    }
    const closeModel = () =>{
        setFormData({
            name:'',
            description:'',
            handler:'',
            budget:'',
            status:'',
        })
        setModalVisible(false)
    }

    const statistics = [
        {
            name: 'Plans',
            value: '187',
            icon: '/assets/icons/plan.png'
        },
        {
            name: 'Executed',
            value: '86',
            icon: '/assets/icons/member.png'
        },
        {
            name: 'Pending',
            value: '101',
            icon: '/assets/icons/visitor.png'
        },
    ]
    const plans = [
        {
            name: 'Mikhael Jasper',
            plan: 'Ignite Mobile App',
            budget: 'UGX 7,405,000',
            status: 'Executed'
        },
        {
            name: 'Jubilee Gold',
            plan: 'Ignite website',
            budget: 'UGX 7,405,000',
            status: 'Executed'
        },
        {
            name: 'Sera Baibe',
            plan: 'Tuesday Flyer',
            budget: 'UGX 7,405,000',
            status: 'Pending'
        },
        {
            name: 'Serungogi Henry',
            plan: '3 TikTok Videos',
            budget: 'UGX 7,405,000',
            status: 'Executed'
        },
        {
            name: 'Daphine Browe',
            plan: 'Ignite Mobile App',
            budget: 'UGX 7,405,000',
            status: 'Pending'
        },
        {
            name: 'Jubilee Gold',
            plan: 'Ignite website',
            budget: 'UGX 7,405,000',
            status: 'Pending'
        },
        {
            name: 'Ssuna Bruno',
            plan: 'Tuesday Flyer',
            budget: 'UGX 7,405,000',
            status: 'Pending'
        },
        {
            name: 'Ssuna Bruno',
            plan: '3 TikTok Videos',
            budget: 'UGX 7,405,000',
            status: 'Executed'
        }
    ]

  return (
    <div className="w-4/5 flex flex-col items-center justify-center">
        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
            {
                statistics.map((stat) => (
                    <div className="w-1/4" key={stat.name}>
                        <SmallDashboardCard name={stat.name} icon={stat.icon} value={stat.value}/>
                    </div>
                ))
            }

        </section>

        <section className="w-[78vw] m-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Plans</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_budget', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                {
                    plans.map((plan)=>(
                        <div key={plan.name} className="w-full" onClick={()=>{openModal({type:'plan', id:plan.name})}}>
                            <ListWidget fields={['name', 'handler', 'budget', 'status']} values={[plan.plan, plan.name, plan.budget, plan.status]}/>
                        </div>
                    ))
                }
            </div>
        </section>
        <BaseModal title={'View/Edit Information'} isVisible={isModalVisible} onClose={closeModel}>
            <PlanForm name={formData.name} decsription={formData.description} handler={formData.handler} budget={formData.budget} status={formData.status}/>
        </BaseModal>
    </div>
  )
}

export default PlanView;