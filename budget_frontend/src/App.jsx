import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'

function App() {
    const user = false
  return (
    <>
        <Navbar user={user} />
        <main className='main-content'>
            <Routes>
                <Route path="/" element={<Home user={user} />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        
        </main>
    </>
  )
}

export default App
