import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppData } from '../providers/AppDataProvider';

export default function BudgetModal({isOpen, onClose, category=null}){
    const [ categoryName, setCategoryName ] = useState('')
    const [ amount, setAmount ] = useState('')
    const [ monthlyRepeat, setMonthlyRepeat] = useState(false)
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState('');
    

    const { createCategory, updateCategory } = useAppData();

    const isEditMode = Boolean(category)
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        setError('')

        const categoryData = {
            category_name : categoryName, 
            allocated_amount : amount, 
            is_recurring: monthlyRepeat}

        try {
            if (isEditMode){
                await updateCategory(category.id, categoryData)
            } else {
                await createCategory(categoryData)
            }
            onClose();
        } catch (error) {
            error.response?.data?.message || 'Something went wrong'
            console.log(error)
    
        }finally{
            setLoading(false)
        }
        
            onClose()
        }

    useEffect(() => {
        if (category) {
            setCategoryName(category.category_name);
            setAmount(category.allocated_amount);
            setMonthlyRepeat(category.monthly_reccurence);
        } else {
            setCategoryName('');
            setAmount('');
            setMonthlyRepeat(false);
        }
    }, [category, isOpen])

    return(
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                    <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
                    initial={{scale:0.9, opacity: 0 }}
                    animate={{scale:1, opacity: 1 }}
                    exit={{scale:0.9, opacity: 0 }}
                    >

                    <h2 className="text-xl font-semibold mb-4 text-center">
                        {isEditMode ? `Edit category ${category.category_name}` : 'Create Category'}
                        </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor='category' className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                  type="text"
                                  name="category"
                                  value={categoryName}
                                  onChange={e => setCategoryName(e.target.value)}
                                  required
                                  className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
                                />
                        </div>
                        
                        <div className="flex gap-2">
                            <div className="flex-3">
                                <label htmlFor='amount' className="block text-sm font-medium text-gray-700">Limit</label>
                                    <input
                                    type="number"
                                    name="amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    required
                                    step="0.01"
                                    className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
                                    />
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <label
                                    htmlFor="monthly_repeat"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Monthly Repeat?
                                </label>
                                    <input
                                        type="checkbox"
                                        id="monthly_repeat"
                                        name="monthly_repeat"
                                        checked={monthlyRepeat}
                                        onChange={e => setMonthlyRepeat(e.target.checked)                                        }
                                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                <span className="text-sm text-gray-700">YES</span>
                                </div>
                            </div>

                             <div className="flex justify-end gap-3 pt-4">
                            <button
                              type="button"
                              onClick={onClose}
                              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                            >
                              {isEditMode ? 'Update' : 'Save' }
                            </button>
                        </div>
                    </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        )

    }