'use client'
import { useState } from "react"
import { useEffect } from "react"
import SmallDashboardCard from "./SmallDashboardCard"
import ListWidget from "./ListWidget"
import BaseModal from "./BaseModal"
import { BudgetForm } from "@forms/BudgetForm"

const BudgetView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [savedTasks, setTasks] = useState({})

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/budgets')
            const data = await response.json()
            setTasks(data)
            console.log(data)
        }
        fetchData()
    },[fetchTrigger])

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        handler:'',
        total:'',
        file:'',
        status:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'budget'){
            setFormData({
                name:'ABC',
                description:'abc',
                handler:'mikky',
                total:'100,000',
                file:'/',
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
            total:'',
            file:'',
            status:'',
        })
        setModalVisible(false)
    }

    const statistics = [
        {
            name: 'Budgets',
            value: '187',
            icon: '/assets/icons/finance.png'
        },
        {
            name: 'Funded',
            value: '86',
            icon: '/assets/icons/member.png'
        },
        {
            name: 'Pending',
            value: '101',
            icon: '/assets/icons/visitor.png'
        },
    ]
    const budgets = [
        {
            name: 'Mikhael Jasper',
            budget: 'Ignite Mobile App',
            total: 'UGX 99000',
            status: 'Funded'
        },
        {
            name: 'Jubilee Gold',
            budget: 'Ignite website',
            total: 'UGX 99000',
            status: 'Funded'
        },
        {
            name: 'Sera Baibe',
            budget: 'Tuesday Flyer',
            total: 'UGX 99000',
            status: 'Pending'
        },
        {
            name: 'Serungogi Henry',
            budget: '3 TikTok Videos',
            total: 'UGX 99000',
            status: 'Funded'
        },
        {
            name: 'Daphine Browe',
            budget: 'Ignite Mobile App',
            total: 'UGX 99000',
            status: 'Pending'
        },
        {
            name: 'Jubilee Gold',
            budget: 'Ignite website',
            total: 'UGX 99000',
            status: 'pending'
        },
        {
            name: 'Ssuna Bruno',
            budget: 'Tuesday Flyer',
            total: 'UGX 99000',
            status: 'Pending'
        },
        {
            name: 'Ssuna Bruno',
            budget: '3 TikTok Videos',
            total: 'UGX 99000',
            status: 'Funded'
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
                <h2 className="font-black text-lg font-bold my-2">Budgets</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_budget', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                {
                    budgets.map((budget)=>(
                        <div className="w-full" onClick={()=>{openModal({type:'budget', id:budget.budget})}} key={budget.name}>
                            <ListWidget fields={['name', 'handler', 'total', 'status']} values={[budget.budget, budget.name, budget.total, budget.status]}/>
                        </div>
                    ))
                }
            </div>
        </section>
        <BaseModal title={'View/Edit Budget'} isVisible={isModalVisible} onClose={closeModel}>
            <BudgetForm title={formData.name} description={formData.description} handler={formData.handler} total={formData.total} file={formData.file} status={formData.status}/>
        </BaseModal>
    </div>
  )
}

export default BudgetView;