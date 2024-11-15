import DashboardSideBar from "@components/DashboardSideBar"
import VisitorView from "@components/VisitorView"

const Visitorspage = () => {
  return (
    <div className="w-full mt-16 p-1 lg:p-2  flex flex-row flex-nowrap items-start jutify-between">
      <VisitorView/>
    </div>
  )
}

export default Visitorspage