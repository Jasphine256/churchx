import DashboardSideBar from "@components/DashboardSideBar"
import BudgetView from "@components/BudgetView"

const BudgetsPage = () => {
  return (
    <div className="w-full mt-16 p-1 lg:p-2 flex flex-row flex-nowrap items-start jutify-between">
      <BudgetView/>
    </div>
  )
}

export default BudgetsPage