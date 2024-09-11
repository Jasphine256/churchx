import DashboardView from "@components/DashboardView";
import DashboardSideBar from "@components/DashboardSideBar";

const Dashboard = () => {

  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <DashboardView/>
    </div>
  )
}

export default Dashboard;