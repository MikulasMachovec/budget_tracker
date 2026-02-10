import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../utils/LoginModal';
import RegisterModal from '../utils/RegisterModal';
import { useAuth } from '../providers/AuthProvider';
import MobileNavbar from './MobileNavbar';

function Navbar() {
  const [ isLoginOpen, setIsLoginOpen ] =useState(false)
  const [ isRegisterOpen, setIsRegisterOpen ] =useState(false)
  const [ isMobileNavOpen, setIsMobileNavOpen ] = useState(false)

  const { user , isAuthenticated, logout } = useAuth();

  // Function to close Login card and open Regster
  const onOpenRegister = () =>{
    setIsLoginOpen(false);
    setIsRegisterOpen(true)
  }
  // Function to close Register card and open Login 
  const onOpenLogin = () =>{
    setIsLoginOpen(true);
    setIsRegisterOpen(false)
  }

  return (
    <>
        <nav className="max-w-6xl p-4 mx-auto mt-6 text-black shadow-md rounded-xl">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Brand */}
            <div className="text-2xl font-bold tracking-wide">Budget Tracker (Budgeteer?)</div>
          
            {/* Links (hidden on mobile) */}
            <div className="items-center hidden space-x-2 md:flex">
                {user ? (
                <>
                {/* logged user */}
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#77726e] transition p-2 rounded-lg">Overview</Link>
                    <Link to='/profile' className="hover:text-gray-200 hover:bg-[#77726e] transition p-2 rounded-lg">Profile</Link>
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#77726e] transition p-2 rounded-lg">Planner</Link>
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#77726e] transition p-2 rounded-lg">Saving</Link>
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#77726e] transition p-2 rounded-lg">History</Link>

                
                    <span className="ml-4 font-medium">Hi, {user.username}</span>
                      <button
                        onClick={() => logout()}
                        className="p-2 text-red-600 transition border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                      >
                        Logout
                      </button>
                </>
                ) : (
                <>
                {/* Default Navabr */}
                    <a onClick={() => setIsLoginOpen(true)} className="ml-4 transition hover:text-gray-200">Login</a>
                    <a onClick={() => setIsRegisterOpen(true)} className="ml-4 transition hover:text-gray-200">Register</a>  
                </>
                )}
            </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            {isMobileNavOpen?
              <button
              type="button"
              onClick={()=> setIsMobileNavOpen(false)}
              className="focus:outline-none"
            >
              <i className="fa-solid fa-x"></i>
            </button>
            :
            <button 
            onClick={() => setIsMobileNavOpen(true) }
            className="focus:outline-none">
              <i className="fa-solid fa-bars"></i>
            </button>
            }
          </div>
        </div>

        <MobileNavbar
          isOpen={isMobileNavOpen}
          onClose={() => {setIsMobileNavOpen(false)}}
          onOpenLogin={onOpenLogin}
          onOpenRegister={onOpenRegister}
          user={user}
        />

      </nav>

      

    <LoginModal 
    isOpen={isLoginOpen}
    onClose={() => {
      setIsLoginOpen(false)
      setIsMobileNavOpen(false)
    }}
    onOpenRegister={onOpenRegister}           
    /> 
    <RegisterModal 
    isOpen={isRegisterOpen}
    onClose={() => setIsRegisterOpen(false)}            
    onOpenLogin={onOpenLogin}
    />       
    </>
  )
}

export default Navbar
