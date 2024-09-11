"use client"
import { useState } from "react";
import { useEffect } from "react";
import ListWidget from "./ListWidget";
import BaseModal from "./BaseModal";
import { ProjectForm } from "@forms/ProjectForm";

const ProjectView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [savedTasks, setTasks] = useState({})

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/projects')
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
        team:'',
        budget:'',
        startDate:'',
    })

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'project'){
            setFormData({
                name:'ABC',
                description:'abc',
                handler:'mikky',
                team:'navi, sera, henry daphie',
                budget:'100,000',
                startDate:'2018-02-11',
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
            team:'',
            budget:'',
            startDate:'',
        })
        setModalVisible(false)
    }

    const projects = [
        {
            name: 'Mikhael Jasper',
            project: 'Ignite Mobile App',
            budget: 'UGX 7,405,000',
            startDate: '22-10-2003'
        },
        {
            name: 'Jubilee Gold',
            project: 'Ignite website',
            budget: 'UGX 7,405,000',
            startDate: '22-10-2003'
        },
        {
            name: 'Sera Baibe',
            project: 'Tuesday Flyer',
            budget: 'UGX 7,405,000',
            startDate: '26-11-2020'
        },
        {
            name: 'Serungogi Henry',
            project: '3 TikTok Videos',
            budget: 'UGX 7,405,000',
            startDate: '22-10-2003'
        },
        {
            name: 'Daphine Browe',
            project: 'Ignite Mobile App',
            budget: 'UGX 7,405,000',
            startDate: '26-11-2020'
        },
        {
            name: 'Jubilee Gold',
            project: 'Ignite website',
            budget: 'UGX 7,405,000',
            startDate: '26-11-2020'
        },
        {
            name: 'Ssuna Bruno',
            project: 'Tuesday Flyer',
            budget: 'UGX 7,405,000',
            startDate: '26-11-2020'
        },
        {
            name: 'Ssuna Bruno',
            project: '3 TikTok Videos',
            budget: 'UGX 7,405,000',
            startDate: '22-10-2003'
        }
    ]
  return (
    <div className="w-4/5 flex flex-col items-center justify-center">

        <section className="w-[78vw] mt-2 flex flex-col items-center justify-start rounded-lg bg-white">
            <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                <h2 className="font-black text-lg font-bold my-2">Projects Database</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_project', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[78vh] overflow-y-auto overflow-x-hidden">
                {
                    projects.map((project)=>(
                        <div key={project.name} className="w-full" onClick={()=>{openModal({type:'project', id:project.name})}}>
                            <ListWidget fields={['name', 'handler', 'budget', 'start date']} values={[project.project, project.name, project.budget, project.startDate]}/>
                        </div>
                    ))
                }
            </div>

        </section>
        <BaseModal title={'View/Edit Information'} isVisible={isModalVisible} onClose={closeModel}>
            <ProjectForm name={formData.name} handler={formData.handler} team={formData.team} investment={formData.budget} startDate={formData.startDate}/>
        </BaseModal>
    </div>
  )
}

export default ProjectView;