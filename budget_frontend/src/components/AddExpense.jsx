import React, { useState } from 'react';
import ExpenseModal from '../utils/ExpenseModal';
import AddIncomeModal from '../utils/AddIncomeModal';


function AddExpense() {
  const [ isExpenseModalOpen, setIsExpenseModalOpen ] = useState(false);
  const [ isIncomeModalOpen , setIsIncomeModalOpen ] = useState(false)

  return ( 
    <>
    <div className="flex flex-col items-center justify-center p-6 mt-4 transition card rounded-xl hover:scale-105">
      <div onClick={() => setIsIncomeModalOpen(true)} className="flex flex-col items-center justify-center w-48 h-24 gap-2 p-6 transition-all border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <i className="text-3xl text-blue-600 fa-solid fa-plus"></i>
        <button className="text-lg font-semibold text-gray-700">Add Income</button>
      </div>

      <div onClick={() => setIsExpenseModalOpen(true)} className="flex flex-col items-center justify-center w-48 h-24 gap-2 p-6 transition-all border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <i className="text-3xl text-blue-600 fa-solid fa-plus"></i>
        <button className="text-lg font-semibold text-gray-700">Add Expense</button>
      </div>
    </div>

      <ExpenseModal
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