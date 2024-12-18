'use client'
import { useState } from "react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import SmallDashboardCard from "./SmallDashboardCard"
import ListWidget from "./ListWidget"
import BaseModal from "./BaseModal"
import { PlanForm } from "@forms/PlanForm"

const PlanView = () => {

    const {data:session} = useSession()

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [loading, setLoading] = useState(true)

    const [fetchedData, setFetchedData] = useState([{
        name:'',
        description:'',
        handler:'',
        budget:'',
        status:'',
    }])
    
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        handler:'',
        budget:'',
        status:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = async (data) =>{
        if (data.type == 'plan'){
            const response = await fetch(`/api/plans/${data.id}`)
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
            description:'',
            handler:'',
            budget:'',
            status:'',
        })
        setModalVisible(false)
        setFetchTrigger((prev)=>{prev+1})
    }

    const statistics = [
        {
            name: 'Plans',
            value: '00',
            icon: '/assets/icons/plan.png'
        },
        {
            name: 'Executed',
            value: '00',
            icon: '/assets/icons/member.png'
        },
        {
            name: 'Pending',
            value: '00',
            icon: '/assets/icons/visitor.png'
        },
    ]

    useEffect(()=>{
        const fetchData = async () =>{
            const queryParams = {user:session?.user.email}
            const queryString = new URLSearchParams(queryParams).toString()
            const response = await fetch(`/api/plans?${queryString}`)
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
    <div className="w-full flex flex-col items-center justify-center">
        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
            {
                statistics.map((stat) => (
                    <div className="w-1/4" key={stat.name}>
                        <SmallDashboardCard name={stat.name} icon={stat.icon} value={stat.value}/>
                    </div>
                ))
            }

        </section>

        <section className="w-full m-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Plans</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_budget', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                {
                    fetchedData.map((plan)=>(
                        <div key={plan.id} className="w-full" onClick={()=>{openModal({type:'plan', id:plan.id})}}>
                            <ListWidget fields={['name', 'handler', 'budget', 'status']} values={[plan.name, plan.handler, plan.budget, plan.status]}/>
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