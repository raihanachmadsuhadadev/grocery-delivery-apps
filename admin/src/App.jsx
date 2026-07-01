import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'

const App = () => {

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000"
  const [token,setToken] = useState(localStorage.getItem("adminToken") || "")

  const handleLogin = (newToken) => {
    localStorage.setItem("adminToken",newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setToken("")
  }

  const handleUnauthorized = () => {
    handleLogout()
  }

  if (!token) {
    return (
      <>
        <ToastContainer/>
        <Routes>
          <Route path="/login" element={<Login url={url} onLogin={handleLogin}/>}/>
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
      </>
    )
  }

  return (
    <div>
      <ToastContainer/>
      <Navbar onLogout={handleLogout}/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} token={token} onUnauthorized={handleUnauthorized}/>}/>
          <Route path="/list" element={<List url={url} token={token} onUnauthorized={handleUnauthorized}/>}/>
          <Route path='/orders' element={<Orders url={url} token={token} onUnauthorized={handleUnauthorized}/>}/>
          <Route path="/login" element={<Navigate to="/list" replace/>}/>
          <Route path="*" element={<Navigate to="/list" replace/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
