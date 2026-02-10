import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../providers/AuthProvider';
import { useError } from '../providers/ErrorProvider';



export default function LoginModal({ isOpen, onClose, onOpenRegister }){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    
    const redirect = useNavigate()
    const { login } = useAuth();
    const { showError, clearError} = useError();

    const handleLogin = async (e) =>  {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const userData = {email, password} 
        
        try{
            await login(userData)
            redirect('/')
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Invalid credentials. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };
        
    return(
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >   
                    <div className="relative flex items-center justify-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Login</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-0 text-lg text-gray-500 hover:text-red-700 "
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </div>

                        
                        <form onSubmit={handleLogin} className='space-y-4' >
                            {/* Email */}
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email:</label>
                                <input type="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-blue-200'/>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password:</label>
                                <input type="password" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring-blue-200'/>
                            </div>

                            <div className='flex justify-end'>
                            <a href="#" 
                            className="ml-4 text-blue-600 underline transition hover:text-gray-200"
                            onClick={onOpenRegister}
                            >
                                Register
                                </a>
                            </div>

                            {error && <div className='block w-full p-1 text-center text-red-700 bg-red-300 border border-red-600 rounded-xl'>{error}</div> }
                            
                            <div className='flex justify-center'>
                                {loading ?
                                    <button
                                    type='submit' 
                                    className="px-4 py-2 text-white bg-blue-300 rounded-xl"
                                    disabled
                                    >
                                        Loggin in ...
                                    </button>
                                    :
                                    <button
                                    type='submit' 
                                    className="px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                                    >
                                        Login
                                    </button>                  
                                }
                            </div>

                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )


}