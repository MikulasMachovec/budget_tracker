import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from '../utils/LoginModal'
import RegisterModal from '../utils/RegisterModal'

function Navbar({ user }) {
  const [ isLoginOpen, setIsLoginOpen] =useState(false)
  const [ isRegisterOpen, setIsRegisterOpen] =useState(false)

  return (
    <>
        <nav className="text-black rounded-xl shadow-md max-w-6xl mx-auto p-4 mt-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* Brand */}
            <div className="text-2xl font-bold tracking-wide">Budget Tracker (Budgeteer?)</div>
          
            {/* Links (hidden on mobile) */}
            <div className="hidden md:flex space-x-6 items-center">
                {user ? (
                <>
                    <Link to='/' className="hover:text-gray-200 transition">Overview</Link>
                    <Link to='/profile' className="hover:text-gray-200 transition">Profile</Link>
                    <Link to='/' className="hover:text-gray-200 transition">Planner</Link>
                    <Link to='/' className="hover:text-gray-200 transition">Saving</Link>
                    <Link to='/' className="hover:text-gray-200 transition">History</Link>

                
                    <span className="ml-4 font-medium">Hi, {user.name}</span>
                </>
                ) : (
                <>
                    <a onClick={() => setIsLoginOpen(true)} className="ml-4 hover:text-gray-200 transition">Login</a>
                    <a onClick={() => setIsRegisterOpen(true)} className="ml-4 hover:text-gray-200 transition">Register</a>
                </>
                )}
            </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <button className="focus:outline-none">☰</button>
          </div>
        </div>
      </nav>

    <LoginModal 
    isOpen={isLoginOpen}
    onClose={() => setIsLoginOpen(false)}
    onSave={NaN}            
    /> 
    <RegisterModal 
    isOpen={isRegisterOpen}
    onClose={() => setIsRegisterOpen(false)}
    onSave={NaN}            
    />       
    </>
  )
}

export default Navbar
