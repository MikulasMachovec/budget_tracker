import React from 'react'

function Dashboard({ data }){
    return (
   <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
  {/* Header */}
  <h1 className="font-semibold text-xl text-gray-800 mb-4 border-b pb-2 w-full text-center">
    Monthly Spending
  </h1>

  {/* Summary Cards */}
  <div className="flex flex-wrap justify-center gap-6">
    {/* Income */}
    <div className="p-6 w-40 text-center bg-gradient-to-b from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition">
      <p className="text-sm font-medium text-green-700">Income</p>
      {/* 
      TODO: optional make this clickable so it can be manually set up
          and then it can be remate to income/spending/balance
      */}
      <p className="text-2xl font-bold text-green-900">{data.monthlyBudget}€</p>
    </div>

    {/* Spending */}
    <div className="p-6 w-40 text-center bg-gradient-to-b from-red-50 to-red-100 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition">
      <p className="text-sm font-medium text-red-700">Spending</p>
      <p className="text-2xl font-bold text-red-900">{data.spending}€</p>
    </div>

    {/* Balance */}
    <div className="p-6 w-40 text-center bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition">
      <p className="text-sm font-medium text-blue-700">Balance</p>
      <p className="text-2xl font-bold text-blue-900">{data.balance}€</p>
    </div>
  </div>

  {/* Detail Button */}
  <button className="flex items-center justify-center gap-2 mt-6 px-6 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition">
    View Details
    <i className="fa-solid fa-caret-down text-gray-600"></i>
  </button>
</div>

  );
}

export default Dashboard