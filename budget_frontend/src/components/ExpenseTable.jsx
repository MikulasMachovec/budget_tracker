import React from 'react'

//TODO: add edit and delete btn and func


function ExpenseTable({expenses}){
    
    return (
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-center">Description</th>
            <th className="px-4 py-2 text-center">Amount</th>
            <th className="px-4 py-2 text-center">Edit</th>
            <th className="px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((tx) => (
            <tr key={tx.id} className="border-b last:border-none hover:bg-gray-50">
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2 text-center">{tx.name}</td>

            { tx.type == 'expense' ? 
                <td
                    className="px-4 py-2 font-medium text-center text-red-600"
                >
                    {-tx.amount} €
                </td>
            :
                <td
                    className="px-4 py-2 font-medium text-center text-green-600"
                >
                    ${tx.amount} €
                </td>
            }
                <td>edit</td>
                <td>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default ExpenseTable