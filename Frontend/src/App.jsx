import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './context/Theme'
import Hero from './pages/Hero'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Routes,Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import HeroSection from "./components/HeroSection.jsx"
import useAuth from "./context/AuthContext";


function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : children;
}

function App() {
  const { user } = useAuth();
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
            path='/home'
            element={
              <ProtectedRoute>
                <HeroSection />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
