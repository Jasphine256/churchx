import DashboardSideBar from "@components/DashboardSideBar"
import BudgetView from "@components/BudgetView"

const BudgetsPage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <BudgetView/>
    </div>
  )
}

export default BudgetsPage