import React, { useState } from 'react';
//import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';

export default function LoginModal({ isOpen, onClose }){
    const [ loginForm, setLoginForm ] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) =>  {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try{
            const response =  axios.post(
                //LOGIN URL,
                loginForm,
                {

                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            console.log('Login success:', response.data);

            // Example: save token
            localStorage.setItem('token', response.data.token);

            setLoginForm({ email: '', password: '' });
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };
        
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
                        <h2 className="text-xl font-semibold text-gray-800">Login</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-0 text-gray-500 text-lg hover:text-red-700 "
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </div>

                        
                        <form onSubmit={handleSubmit} className='space-y-4' >
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Email:</label>
                                <input type="email" 
                                name="email"
                                value={loginForm.email}
                                onChange={handleChange}
                                required
                                className='mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring-blue-200'/>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Password:</label>
                                <input type="password" 
                                name="password"
                                value={loginForm.password}
                                onChange={handleChange}
                                required
                                className='mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring-blue-200'/>
                            </div>

                            <div className='flex justify-end'>
                            <a href="#" className=" ml-4 text-blue-600 underline hover:text-gray-200 transition">Register</a>
                            </div>
                            
                            <div className='flex justify-center'>
                                <button
                                type='submit' 
                                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Login
                                </button>

                            </div>

                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )


}