import DashboardSideBar from "@components/DashboardSideBar"
import ProjectView from "@components/ProjectView"

const ProjectsPage = () => {
  return (
    <div className="w-full mt-16 p-1 lg:p-2  flex flex-row flex-nowrap items-start jutify-between">
      <ProjectView/>
    </div>
  )
}

export default ProjectsPage