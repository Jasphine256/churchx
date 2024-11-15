import DashboardSideBar from "@components/DashboardSideBar"
import PlanView from "@components/PlanView"

const PlansPage = () => {
  return (
    <div className="w-full mt-16 p-1 lg:p-2  flex flex-row flex-nowrap items-start jutify-between">
      <PlanView/>
    </div>
  )
}

export default PlansPage