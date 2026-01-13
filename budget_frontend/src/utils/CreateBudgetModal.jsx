import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CreateBudgetModal({isOpen, onClose, onSave}){
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        monthly_repeat: false,
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSave(formData);
        setFormData({name:'', amount:'', monthly_repeat: false});
        onClose();
        }
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

                    <h2 className="text-xl font-semibold mb-4 text-center">Create Budget</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                  type="text"
                                  name="category"
                                  value={formData.category}
                                  onChange={handleChange}
                                  required
                                  className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
                                />
                        </div>
                        
                        <div className="flex gap-2">
                            <div className="flex-3">
                                <label className="block text-sm font-medium text-gray-700">Limit</label>
                                <input
                                type="number"
                                name="amount"
                                value={formData.limit}
                                onChange={handleChange}
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
                                    checked={formData.monthly_repeat}
                                    onChange={(e) =>
                                    setFormData({ ...formData, monthly_repeat: e.target.checked })
                                    }
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
                              Save
                            </button>
                        </div>
                    </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        )

    }