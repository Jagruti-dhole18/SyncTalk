import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './pages/Landing'
import AuthenticationPage from './pages/AuthenticationPage'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeet from './pages/VideoMeet'
import Home from './pages/Home'
import History from './pages/History'
import ContactUs from './pages/ContactUs'
import Footer from './pages/Footer'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
       <Routes>

        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth' element={<AuthenticationPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/contact' element={<ContactUs/>} />
         <Route path='/:url' element={<VideoMeet/>} />
       </Routes>
       </AuthProvider>
      </Router>
    </>
  )
}

export default App
