import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppData } from '../providers/AppDataProvider';
import api from '../api';

export default function AddExpenseModal({ isOpen, onClose, onSave }) {
  const [expenseName, setExpenseName] = useState('');
  const [categoryID, setCategoryID ] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {categories, addExpense} = useAppData();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const expenseData = {
        expense_name: expenseName, 
        category_id : categoryID, 
        amount, 
        date
      };
      console.log('expenseData', expenseData)
      await addExpense(expenseData)
      console.log('Response --->', response)
    } catch (error) {
      setError(
        error.response?.data?.message || 'Something happend while saving expense'
      )
      console.log(error)
    } finally{
      setLoading(false)
    }


    onClose();
  };

  return (
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
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor='expenseName' className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="expenseName"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label htmlFor='category' className="block text-sm font-medium text-gray-700">Description</label>
                <select
                  name="category"
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
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
                    className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
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
                    className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring focus:ring-blue-200"
                  />
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
  );
}
