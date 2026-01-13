import React from 'react'

function Transaction(){
    return (
      <div className="p-6 rounded-lg shadow-md card">
          <h3 className="mb-4 text-xl font-bold">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b last:border-none hover:bg-gray-50">
                    <td className="px-4 py-2">{tx.id}</td>
                    <td className="px-4 py-2">{tx.description}</td>
                    <td
                      className={`px-4 py-2 text-right font-medium ${
                        tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      ${tx.amount}
                    </td>
                    <td className="px-4 py-2">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}

export default Transaction