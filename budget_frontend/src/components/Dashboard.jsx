import React, { useState } from 'react'
import AddExpenseModal from '../utils/ExpenseModal'
import AddIncomeModal from '../utils/AddIncomeModal'
import ExpensesDetails from '../utils/ExpensesDetails'

function Dashboard({ data }) {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  

  return (
    <section className="p-8 mx-auto bg-white border border-gray-200 rounded-2xl">
      
      {/* Header */}
      <h2 className="mb-6 text-lg font-semibold text-center text-gray-800">
        Monthly Spending
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        
        {/* Income */}
        <div className="p-5 border border-gray-200 rounded-xl">
          <p className="text-xs tracking-wide text-gray-500 uppercase">
            Income
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {data.monthlyBudget} €
          </p>

          <div className="pt-3 mt-4 border-t border-dashed">
            <button
              onClick={() => setIsIncomeModalOpen(true)}
              className="text-sm text-green-600 hover:underline"
            >
              Add income
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
          <p className="text-xs tracking-wide text-gray-500 uppercase">
            Balance
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {data.balance} €
          </p>

          <div className="pt-3 mt-4 border-t border-dashed">
            <p className="text-sm text-gray-500">
              Available
            </p>
          </div>
        </div>

        {/* Spending */}
        <div className="p-5 border border-gray-200 rounded-xl">
          <p className="text-xs tracking-wide text-gray-500 uppercase">
            Spending
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {data.spending} €
          </p>

          <div className="pt-3 mt-4 border-t border-dashed">
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="text-sm text-red-600 hover:underline"
            >
              Add expense
            </button>
          </div>
        </div>
      </div>

      {/* Footer action */}
      <div className="flex justify-center mt-8">
        <button 
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          onClick={() => setIsDetailsOpen(prev => !prev)}    
        >
          { isDetailsOpen ? 
          (<>Close expenses details <i className="text-xs fa-solid fa-caret-up"></i></>) :
          (<>Open expenses details  <i className="text-xs fa-solid fa-caret-down"></i></>)
          }
        </button>
      </div>

      {/* Modals */}
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
      <AddIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
      />
      <ExpensesDetails
        isOpen={isDetailsOpen}
        expenses={data.expenses}
      />
    </section>
  )
}

export default Dashboard
