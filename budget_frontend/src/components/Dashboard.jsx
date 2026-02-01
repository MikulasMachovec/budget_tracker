import React, { useState } from 'react'
import AddExpenseModal from '../utils/AddExpenseModal'
import AddIncomeModal from '../utils/AddIncomeModal'

function Dashboard({ data }) {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)

  return (
    <section className="mx-auto bg-white rounded-2xl border border-gray-200 p-8">
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Monthly Spending
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Income */}
        <div className="p-5 border border-gray-200 rounded-xl">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Income
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {data.monthlyBudget} €
          </p>

          <div className="mt-4 pt-3 border-t border-dashed">
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
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Balance
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {data.balance} €
          </p>

          <div className="mt-4 pt-3 border-t border-dashed">
            <p className="text-sm text-gray-500">
              Available
            </p>
          </div>
        </div>

        {/* Spending */}
        <div className="p-5 border border-gray-200 rounded-xl">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Spending
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {data.spending} €
          </p>

          <div className="mt-4 pt-3 border-t border-dashed">
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
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          View details
          <i className="fa-solid fa-caret-down text-xs"></i>
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
    </section>
  )
}

export default Dashboard
