import DashboardSideBar from "@components/DashboardSideBar"
import VisitorView from "@components/VisitorView"

const Visitorspage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <VisitorView/>
    </div>
  )
}

export default Visitorspage