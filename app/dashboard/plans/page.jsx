import DashboardSideBar from "@components/DashboardSideBar"
import PlanView from "@components/PlanView"

const PlansPage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <PlanView/>
    </div>
  )
}

export default PlansPage