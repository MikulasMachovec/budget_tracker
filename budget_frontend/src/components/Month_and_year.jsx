import React from 'react'

function MonthAndYear() {
  return (
    <div className="flex flex-row items-start justify-center gap-4 mb-4">

      {/* Month Card */}
      <div
        id="background_card"
        className="bg-white shadow-md rounded-lg px-8 py-6 flex items-center justify-between w-72 text-gray-800"
      >
        <button className="hover:text-blue-600 transition">
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <p className="font-semibold text-xl">October</p>

        <button className="hover:text-blue-600 transition">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Year Selector */}
      <div
        id="background_card"
        className="bg-white shadow-md rounded-md px-4 py-2 flex items-center justify-between w-32 text-gray-800"
      >
        <button className="hover:text-blue-600 transition">
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>

        <p className="font-medium text-base">2025</p>

        <button className="hover:text-blue-600 transition">
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </button>
      </div>

    </div>
  )
}

export default MonthAndYear
