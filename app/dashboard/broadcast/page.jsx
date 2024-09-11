import DashboardSideBar from "@components/DashboardSideBar"
import BroadCastForm from "@components/BroadCastForm"

const Broadcastpage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <BroadCastForm/>
    </div>
  )
}

export default Broadcastpage