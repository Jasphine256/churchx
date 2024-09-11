"use client"
import DashboardSideBar from "@components/DashboardSideBar"
import FinanceView from "@components/FinanceView"

const FinancePage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <FinanceView/>
    </div>
  )
}

export default FinancePage;