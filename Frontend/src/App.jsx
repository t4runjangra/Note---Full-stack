import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './context/Theme'
import Hero from './pages/Hero'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import useAuth from "./context/AuthContext";
import Loading from './components/Loading.jsx'
import Profile from './pages/Profile.jsx'
import Note from './components/Note.jsx'
function ProtectedRoute({ children }) {
  const { user, authChecked } = useAuth();

  if (!authChecked) {
    return <Loading />;
  }

  return user ? children : <Navigate to="/signin" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}


function App() {
  const { user, authChecked } = useAuth();
  const [themeMode, setThemeMode] = useState("dark")
  function darkTheme() {
    setThemeMode("dark")
  }
  function lightTheme() {
    setThemeMode("light")
  }
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark")
    document.querySelector("html").classList.add(themeMode)
  }, [themeMode])

  if (!authChecked) {
    return <Loading />;
  }

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element=
            {
              user ? <Navigate to="/home" /> : <Hero />
            } />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute >
            }
          />

          <Route
            path="/signin"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Note />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
