"use client"

import DashboardSideBar from "@components/DashboardSideBar"
import MemberView from "@components/MemberView"

const MembersPage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <MemberView/>
    </div>
  )
}

export default MembersPage