import useTheme from "../context/Theme";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import API from "../api/axios";
function Navbar() {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  function handleChange(e) {
    if (e.currentTarget.checked) {
      darkTheme();
    } else {
      lightTheme();
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          My Notes
        </Link>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


        <div className="hidden sm:flex items-center gap-4">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              onChange={handleChange}
              checked={themeMode === "dark"} />
            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700 dark:after:border-slate-600" />
            <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              Theme
            </span>
          </label>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>

                <span className="max-w-45 truncate text-sm font-medium">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-2xl" >Sign Up</Link>
            </>
          )}
        </div>
      </div>


      {menuOpen && (
        <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:hidden">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              onChange={handleChange}
              checked={themeMode === "dark"} />
            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700 dark:after:border-slate-600" />
            <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              Theme
            </span>
          </label>

          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                  {user.email?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Signed in as
                  </span>

                  <span className="max-w-45 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                    {user.email}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-2xl text-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;