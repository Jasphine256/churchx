import DashboardSideBar from "@components/DashboardSideBar"
import ProjectView from "@components/ProjectView"

const ProjectsPage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <ProjectView/>
    </div>
  )
}

export default ProjectsPage