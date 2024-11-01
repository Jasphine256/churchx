'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import ListWidget from "./ListWidget"
import SmallDashboardCard from "./SmallDashboardCard"
import LargeDashboradCard from "./LargeDashboradCard"
import BaseModal from "./BaseModal"

const DashboardView = () => {

    const {data:session} = useSession()

    const [itemSelection, setSelection] = useState({type:'', id:''})

    const [isModalVisible, setModalVisible] = useState(false)

    const [loading, setLoading] = useState(true)

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const openModal = (data) =>{
        setSelection(data)
        setModalVisible(true)
    }
    const closeModel = () =>{
        setModalVisible(false)
    }

    const articles = [
        {
            name: 'Tasks',
            value: '00',
            icon: '/assets/icons/task.png'
        },
        {
            name: 'Plans',
            value: '00',
            icon: '/assets/icons/plan.png'
        },
        {
            name: 'Projects',
            value: '00',
            icon: '/assets/icons/project.png'
        },
    ]

    const people = [
        {
            name: 'Ministers',
            value: '00',
            icon: '/assets/icons/minister.png'
        },
        {
            name: 'Members',
            value: '00',
            icon: '/assets/icons/member.png'
        },
        {
            name: 'Visitors',
            value: '00',
            icon: '/assets/icons/visitor.png'
        },
        
    ]

    const [savedTasks, setTasks] = useState([{
        title:'',
        handler:'',
        deadline:'',
        status:''
    }])

    useEffect(()=>{
        const fetchData = async () =>{
            const queryParams = {user:session?.user.email}
            const queryString = new URLSearchParams(queryParams).toString()
            const response = await fetch(`/api/tasks?${queryString}`)
            const data = await response.json()
            setTasks(data.message)
        }
        fetchData()
        setLoading(false)
    },[fetchTrigger])

    if (loading){
        return(<></>)
    }
  return (
    <div className="w-4/5 flex flex-col items-center justify-center">
        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
            {
                articles.map((article) => (
                    <div className="w-1/4" key={article.name}>
                        <LargeDashboradCard name={article.name} icon={article.icon} value={article.value}/>
                    </div>
                ))
            }

        </section>

        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
            {
                people.map((person) => (
                    <div className="w-1/4" key={person.name}> 
                        <SmallDashboardCard name={person.name} icon={person.icon} value={person.value}/>
                    </div>
                ))
            }

        </section>

        <section className="w-[78vw] m-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <h2 className="font-black text-lg font-bold my-2">Recent Tasks</h2>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[38vh] overflow-y-auto overflow-x-hidden">
            {
                savedTasks.map((task)=>(
                    <div className="w-full" key={task.task} onClick={()=>{openModal({type:'delayed', id:task.task})}}>
                        <ListWidget fields={['title', 'handler', 'deadline', 'status']} values={[task.task, task.name, task.deadline, task.status]}/>
                    </div>
                ))
            }
            </div>
        </section>
        <BaseModal title={'Details'} isVisible={isModalVisible} onClose={closeModel}>
            <p>{itemSelection.id}</p>
        </BaseModal>
    </div>
  )
}

export default DashboardView;