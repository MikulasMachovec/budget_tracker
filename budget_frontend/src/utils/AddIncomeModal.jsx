import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppData } from '../providers/AppDataProvider';

export default function AddIncomeModal({ isOpen, onClose }) {
  const [incomeName, setIncomeName] = useState('Salary');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isReccurring, setIsReccurring] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {categories, addExpense, addIncome} = useAppData();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const incomeData = {
        name: incomeName, 
        amount,
        is_reccurring: isReccurring,
        date
      };
      await addIncome(incomeData)
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
            <h2 className="mb-4 text-xl font-semibold text-center">Add Income</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor='incomeName' className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="incomeName"
                  value={incomeName}
                  onChange={(e) => setIncomeName(e.target.value)}
                  required
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
                />
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
                        checked={isReccurring}
                        onChange={e => setIsReccurring(e.target.checked)                                        }
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                <span className="text-sm text-gray-700">YES</span>
              </div>
            

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
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
