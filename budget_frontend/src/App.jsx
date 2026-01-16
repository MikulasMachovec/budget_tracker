import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'
import Footer from './components/Footer.jsx'

function App() {
    const user = false
    // {
    //   name : 'Dev',
    //   monthlyBudget : 2000,
    //   spending : 1500,
    //   balance : 500
    // }
  return (
    <>
        <Navbar user={user} />
        <main className='main-content'>
            <Routes>
                <Route path="/" element={<Home user={user} />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        
        </main>
        <Footer />
    </>
  )
}

export default App
