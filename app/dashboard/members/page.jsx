import DashboardSideBar from "@components/DashboardSideBar"
import MemberView from "@components/MemberView"

const MembersPage = () => {
  return (
    <div className="w-full mt-16 p-1 lg:p-2  flex flex-row flex-nowrap items-start jutify-between">
      <MemberView/>
    </div>
  )
}

export default MembersPage