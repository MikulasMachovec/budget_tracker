import React from 'react'

function MonthAndYear() {
  return (
    <div className="flex items-center justify-between py-4">
      <button>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

        <h2 className="text-lg font-medium">January 2026</h2>

      <button>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      
    </div>

  )
}

export default MonthAndYear
