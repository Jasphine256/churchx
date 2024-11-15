import DashboardSideBar from "@components/DashboardSideBar"
import TasksView from "@components/TasksView"

const TasksPage = () => {
  return (
    <div className="w-full mt-16 p-1 lg:p-2  flex flex-row flex-nowrap items-start jutify-between">
      <TasksView/>
    </div>
  )
}

export default TasksPage