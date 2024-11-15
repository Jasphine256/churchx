'use client'
import { useState } from "react"
import { useEffect } from "react"
import SmallDashboardCard from "./SmallDashboardCard"
import ListWidget from "./ListWidget"
import BaseModal from "./BaseModal"
import { BudgetForm } from "@forms/BudgetForm"
import { useSession } from "next-auth/react"

const BudgetView = () => {

    const {data:session} = useSession()

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [loading, setLoading] = useState(true)

    const [fetchedData, setFetchedData] = useState([{
        name:'',
        description:'',
        handler:'',
        total:'',
        file:'',
        status:'',
    }])

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        handler:'',
        total:'',
        file:'',
        status:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = async (data) =>{
        if (data.type == 'budget'){
            const response = await fetch(`/api/budgets/${data.id}`)
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
            total:'',
            file:'',
            status:'',
        })
        setFetchTrigger((prev)=>{prev+1})
        setModalVisible(false)
    }

    const statistics = [
        {
            name: 'Budgets',
            value: '00',
            icon: '/assets/icons/finance.png'
        },
        {
            name: 'Funded',
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
            const response = await fetch(`/api/budgets?${queryString}`)
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
        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
            {
                statistics.map((stat) => (
                    <div className="w-1/4" key={stat.name}>
                        <SmallDashboardCard name={stat.name} icon={stat.icon} value={stat.value}/>
                    </div>
                ))
            }

        </section>

        <section className="w-full flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Budgets</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_budget', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                {
                    fetchedData.map((budget)=>(
                        <div className="w-full" onClick={()=>{openModal({type:'budget', id:budget.id})}} key={budget.id}>
                            <ListWidget fields={['name', 'handler', 'total', 'status']} values={[budget.name, budget.handler, budget.total, budget.status]}/>
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