import DashboardSideBar from "@components/DashboardSideBar"
import SettingsView from "@components/SettingsView"

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap items-start jutify-between">
      <DashboardSideBar/>
      <SettingsView/>
    </div>
  )
}

export default SettingsPage
