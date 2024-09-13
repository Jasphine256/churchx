"use client"
import { useState } from "react";
import { useEffect } from "react";
import ListWidget from "./ListWidget";
import BaseModal from "./BaseModal";
import { ProjectForm } from "@forms/ProjectForm";

const ProjectView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [loading, setLoading] = useState(true)

    const [fechedData, setFetchedData] = useState([{
        name:'',
        description:'',
        handler:'',
        team:'',
        budget:'',
        startDate:'',
    }])

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
        setFetchTrigger((prev)=>{prev+1})
    }

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/projects')
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
                <h2 className="font-black text-lg font-bold my-2">Projects Database</h2>
                <div>
                    <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_project', id: NaN})}}>Add New</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col items-center justify-start h-[78vh] overflow-y-auto overflow-x-hidden">
                {
                    fechedData.map((project)=>(
                        <div key={project.id} className="w-full" onClick={()=>{openModal({type:'project', id:project.id})}}>
                            <ListWidget fields={['name', 'handler', 'budget', 'startDate']} values={[project.name, project.handler, project.budget, project.startDate]}/>
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