import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl p-4">
        <Navbar />
      </div>

      <Outlet />
    </div>
  )
}

export default Layout