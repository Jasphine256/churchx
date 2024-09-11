import DashboardSideBar from "@components/DashboardSideBar"
import TasksView from "@components/TasksView"

const TasksPage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <TasksView/>
    </div>
  )
}

export default TasksPage