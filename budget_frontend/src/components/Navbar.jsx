import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../utils/LoginModal';
import RegisterModal from '../utils/RegisterModal';
import { useAuth } from '../AuthProvider';
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
        <nav className="text-black rounded-xl shadow-md max-w-6xl mx-auto p-4 mt-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* Brand */}
            <div className="text-2xl font-bold tracking-wide">Budget Tracker (Budgeteer?)</div>
          
            {/* Links (hidden on mobile) */}
            <div className="hidden md:flex space-x-2 items-center">
                {user ? (
                <>
                {/* logged user */}
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#fcab77] transition p-2 rounded-lg">Overview</Link>
                    <Link to='/profile' className="hover:text-gray-200 hover:bg-[#fcab77] transition p-2 rounded-lg">Profile</Link>
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#fcab77] transition p-2 rounded-lg">Planner</Link>
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#fcab77] transition p-2 rounded-lg">Saving</Link>
                    <Link to='/' className="hover:text-gray-200 hover:bg-[#fcab77] transition p-2 rounded-lg">History</Link>

                
                    <span className="ml-4 font-medium">Hi, {user.username}</span>
                    <a onClick={() => logout()} className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition'>Logout</a>
                </>
                ) : (
                <>
                {/* Default Navabr */}
                    <a onClick={() => setIsLoginOpen(true)} className="ml-4 hover:text-gray-200 transition">Login</a>
                    <a onClick={() => setIsRegisterOpen(true)} className="ml-4 hover:text-gray-200 transition">Register</a>  
                </>
                )}
            </div>

          {/* Mobile menu placeholder */}
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

        {/* {isMobileNavOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-4 p-4">
              <li className="flex justify-center py-3 rounded-lg mb-1">
                <a onClick={() => setIsLoginOpen(true)} 
                  className="hover:text-gray-200 transition text-lg cursor-pointer"
                  >
                  Login
                  </a>
              </li>
              <li className='flex justify-center py-1 rounded-lg mb-3'>
                <a onClick={() => setIsRegisterOpen(true)} 
                className="ml-4 hover:text-gray-200 transition text-lg cursor-pointer"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        )} */}

        <MobileNavbar
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          onOpenLogin={onOpenLogin}
          onOpenRegister={onOpenRegister}
          user={user}
        />

      </nav>

      

    <LoginModal 
    isOpen={isLoginOpen}
    onClose={() => setIsLoginOpen(false)}
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
