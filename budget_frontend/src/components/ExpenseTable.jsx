import React from 'react'

function ExpenseTable({expenses}){
    return (
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-center">Description</th>
            <th className="px-4 py-2 text-center">Amount</th>
            <th className="px-4 py-2 text-center">Date</th>
            <th className="px-4 py-2 text-center">Edit</th>
            <th className="px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((tx) => (
            <tr key={tx.id} className="border-b last:border-none hover:bg-gray-50">
              <td className="px-4 py-2">{tx.id}</td>
              <td className="px-4 py-2">{tx.expense_name}</td>
              <td
                className={`px-4 py-2 text-center font-medium ${
                  -tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                ${-tx.amount}
              </td>
              <td className="px-4 py-2 text-center">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default ExpenseTable