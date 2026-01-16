import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../api.js';

export default function RegisterModal({ isOpen, onClose, onSave }){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_2, setPassword_2] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);


    const handleRegistration = async (e) => {
        e.preventDefault();
        
        try {
            setErrors({})
            if(password !== password_2){
                setErrors({ password : 'Passwords do not match' });
                return; 
            }
                
            const userData = {
                username, email, password
            }
            const response = await api.post('/api/account/register/', userData) 
            setSuccess(true)
        } catch (error) {
            setErrors(prevError =>({
                ...prevError,
                ...error.response.data}))
            console.log('Registration error:', errors)
        }       
       
        return
    }

    return(
        <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >   
                            <div className="relative mb-4 flex items-center justify-center">
                                <h2 className="text-xl font-semibold text-gray-800">Registration</h2>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute right-0 text-gray-500 text-lg hover:text-red-700 "
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
        
                                
                                <form onSubmit={handleRegistration} className='space-y-4' >
                                    {/* Username */}
                                    <div>
                                        <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Usermane:</label>
                                        <input type="text" 
                                        id='username'
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        autoComplete='on'
                                        required
                                        className={`mt-1 block w-full rounded-xl p-2 focus:ring-blue-200'
                                            ${errors.username ? 'border border-red-500' : ' border border-gray-300' }`}/>
                                        <small>{errors.username && <div className='text-red-500'>{errors.username}</div>}</small>
                                    </div>
                                    
                                    {/* Email */}
                                    <div>
                                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email:</label>
                                        <input type="email" 
                                        id='email'
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete='on'
                                        required
                                        className={`mt-1 block w-full rounded-xl p-2 focus:ring-blue-200'
                                            ${errors.email ? 'border border-red-500' : ' border border-gray-300' }`}
                                        />
                                        <small>{errors.email && <div className='text-red-500'>{errors.email}</div>}</small>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password:</label>
                                        <input type="password"
                                        id='password' 
                                        name="password"
                                        value={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                        autoComplete='off'
                                        required
                                        className={`mt-1 block w-full rounded-xl p-2 focus:ring-blue-200'
                                            ${errors.password ? 'border border-red-500' : ' border border-gray-300' }`}/>
                                        <small>{errors.password && <div className='text-red-500'>{errors.password}</div>}</small>
                                    </div>

                                    {/* Second Password */}
                                    <div>
                                        <label htmlFor='password_again' className='block text-sm font-medium text-gray-700'>Password again:</label>
                                        <input type="password" 
                                        id='password_again'
                                        name="password"
                                        value={password_2}
                                        onChange={(e) => setPassword_2(e.target.value)}
                                        autoComplete="off"
                                        required
                                        className={`mt-1 block w-full rounded-xl p-2 focus:ring-blue-200'
                                            ${errors.password ? 'border border-red-500' : ' border border-gray-300' }`}/>
                                        <small>{errors.password && <div className='text-red-500'>{errors.password}</div>}</small>
                                    </div>
        
                                    <div className='flex justify-center'>
                                        <p>Already budgeting?</p>
                                    <a href="#" className=" ml-4 text-blue-600 underline hover:text-gray-200 transition">Login</a>
                                    </div>

                                    {success && <div className='block w-full p-1 border border-green-600 rounded-xl bg-green-300 text-center'>Registered successfully</div> }
                                    
                                    <div className='flex justify-center'>
                                        <button
                                        type='submit' 
                                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Register
                                        </button>
        
                                    </div>
        
                                </form>
        
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
    )


}