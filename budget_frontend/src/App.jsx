import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'
import Footer from './components/Footer.jsx'
import AuthProvider from './AuthProvider.jsx'
import AppDataProvider from './AppDataProvider.jsx'

function App() {
  return (
    <>
      <AppDataProvider>
        <AuthProvider>
          <Navbar />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            
            </main>
          <Footer />
        </AuthProvider>
      </AppDataProvider>
    </>
  )
}

export default App
