import React, { useState } from 'react';
import AddExpenseModal from '../utils/AddExpenseModal';
import AddIncomeModal from '../utils/AddIncomeModal';


function AddExpense() {
  const [ isExpenseModalOpen, setIsExpenseModalOpen ] = useState(false);
  const [ isIncomeModalOpen , setIsIncomeModalOpen ] = useState(false)

  return ( 
    <>
    <div className="card flex flex-col items-center justify-center p-6 mt-4 rounded-xl transition hover:scale-105">
      <div onClick={() => setIsIncomeModalOpen(true)} className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-lg p-6 w-48 h-24 hover:bg-gray-50 cursor-pointer transition-all">
        <i className="fa-solid fa-plus text-3xl text-blue-600"></i>
        <button className="font-semibold text-lg text-gray-700">Add Income</button>
      </div>

      <div onClick={() => setIsExpenseModalOpen(true)} className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-lg p-6 w-48 h-24 hover:bg-gray-50 cursor-pointer transition-all">
        <i className="fa-solid fa-plus text-3xl text-blue-600"></i>
        <button className="font-semibold text-lg text-gray-700">Add Expense</button>
      </div>
    </div>

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
      <AddIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
      />
      
    </>
  );
  
}

export default AddExpense