import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppData } from '../providers/AppDataProvider';
import api from '../api';

export default function ExpenseModal({ isOpen, onClose, expense=null }) {
  const [expenseName, setExpenseName] = useState('');
  const [categoryID, setCategoryID ] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {categories, addExpense, updateExpense} = useAppData();
  

  const isEditMode = Boolean(expense)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const expenseData = {
      expense_name: expenseName, 
      category_id : categoryID, 
      amount, 
      date
    };

    
    try {
        if(isEditMode){
            await updateExpense(expense.id,expenseData)
        } else {
            await addExpense(expenseData)
        }
            
    } catch (error) {
      setError(
        error.response?.data?.message || 'Something happend while saving expense'
      )
    } finally{
      setLoading(false)
    }
    onClose();
  };

  return (
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
            <h2 className="mb-4 text-xl font-semibold text-center">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor='expenseName' className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="expenseName"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  required
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label htmlFor='category' className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor='amount' className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    step="0.01"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor='date' className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>

                {loading ? 
                    <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                    {isEditMode ? 'Updating' : 'Saving' } 
                    </button>
                :
                    <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                    {isEditMode ? 'Update' : 'Save' }
                    </button>
                }
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
