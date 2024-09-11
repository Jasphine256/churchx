'use client'
import { useState } from "react"
import { useEffect } from "react"
import SmallDashboardCard from "./SmallDashboardCard"
import ListWidget from "./ListWidget"
import BaseModal from "./BaseModal"
import { TaskForm } from "@forms/TaskForm"

const TasksView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [savedTasks, setTasks] = useState({})

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/tasks')
            const data = await response.json()
            setTasks(data)
            console.log(data)
        }
        fetchData()
    },[fetchTrigger])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        handler: '',
        startDate: '',
        deadline: '',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'task'){
            setFormData({
                title: 'ABC',
                description: 'abc',
                handler: 'mikky',
                startDate: '2024-06-09',
                deadline: '2024-08-05',
            })
            setModalVisible(true)
        }else{
            setModalVisible(true)
        }
    }
    const closeModel = () =>{
        setFormData({
            title: '',
            description: '',
            handler: '',
            startDate: '',
            deadline: '',
        })
        setModalVisible(false)
    }

    const statistics = [
        {
            name: 'Tasks',
            value: '187',
            icon: '/assets/icons/task.png'
        },
        {
            name: 'Finished',
            value: '86',
            icon: '/assets/icons/member.png'
        },
        {
            name: 'Pending',
            value: '101',
            icon: '/assets/icons/visitor.png'
        },
    ]
    const tasks = [
        {
            name: 'Mikhael Jasper',
            task: 'Ignite Mobile App',
            deadline: '22-10-2003',
            status: 'Finished'
        },
        {
            name: 'Jubilee Gold',
            task: 'Ignite website',
            deadline: '04-07-2005',
            status: 'Delayed'
        },
        {
            name: 'Sera Baibe',
            task: 'Tuesday Flyer',
            deadline: '26-11-2020',
            status: 'Pending'
        },
        {
            name: 'Serungogi Henry',
            task: '3 TikTok Videos',
            deadline: '08-08-2024',
            status: 'Delayed'
        },
        {
            name: 'Daphine Browe',
            task: 'Ignite Mobile App',
            deadline: '22-10-2003',
            status: 'Finished'
        },
        {
            name: 'Jubilee Gold',
            task: 'Ignite website',
            deadline: '04-07-2005',
            status: 'Delayed'
        },
        {
            name: 'Ssuna Bruno',
            task: 'Tuesday Flyer',
            deadline: '26-11-2020',
            status: 'Pending'
        },
        {
            name: 'Ssuna Bruno',
            task: '3 TikTok Videos',
            deadline: '08-08-2024',
            status: 'Delayed'
        }
    ]
  return (
    <div className="w-4/5 flex flex-col items-center justify-center">
        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
            {
                statistics.map((stat) => (
                    <div className="w-1/4"  key={stat.name}>
                        <SmallDashboardCard name={stat.name} icon={stat.icon} value={stat.value}/>
                    </div>
                ))
            }

        </section>

        <section className="w-[78vw] mt-2  flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Tasks</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_task', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                {
                    tasks.map((task)=>(
                        <div className="w-full" key={task.task} onClick={()=>{openModal({type:'task', id:task.name})}}>
                            <ListWidget fields={['title', 'handler', 'deadline', 'status']} values={[task.task, task.name, task.deadline, task.status]}/>
                        </div>

                    ))
                }
            </div>
            
        </section>
        <BaseModal title={'View/Edit Task'} isVisible={isModalVisible} onClose={closeModel}>
            <TaskForm title={formData.title} handler={formData.handler} description={formData.description} startDate={formData.startDate} deadline={formData.deadline}/>
        </BaseModal>
    </div>
  )
}

export default TasksView;