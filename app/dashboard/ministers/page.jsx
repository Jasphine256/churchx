import DashboardSideBar from "@components/DashboardSideBar"
import MinisterView from "@components/MinisterView"

const Ministerspage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <MinisterView/>
    </div>
  )
}

export default Ministerspage