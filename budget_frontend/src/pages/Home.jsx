import React from 'react'
import MonthAndYear from '../components/Month_and_year.jsx'
import Dashboard from '../components/Dashboard.jsx'
import AddExpense from '../components/AddExpense.jsx'
import Friends from '../components/Friends.jsx'
import Budgets from '../components/Budgets.jsx'


function Home({ user }) {

  const transactions = [
    { id: 1, description: 'Groceries', amount: -50, date: '2025-10-10' },
    { id: 2, description: 'Salary', amount: 3000, date: '2025-10-01' },
    { id: 3, description: 'Utilities', amount: -120, date: '2025-10-08' },
  ]

  const budget_data = [
      {id:1, name: 'Groceries', used: 250, max_amount: 500},
      {id:2, name: 'Car', used: 100, max_amount: 3500},
      {id:3, name: 'Fun', used: 175, max_amount: 200},
      ]


  return (
    <>
    <main className="max-w-6xl p-4 mx-auto">

          <MonthAndYear />

          {/* Center card */}
          <div className="grid grid-cols-1 gap-4 p-2 mb-4 lg:flex lg:flex-row lg:justify-evenly">
              <div className='square-aspect'>
                  <AddExpense />
              </div>
              <div >
                  <Dashboard data={user} />
              </div>
              <div className='square-aspect'>
                  <Friends />
              </div>
          </div>

        <Budgets budget={budget_data} />

      </main>
    </>
  )
}

export default Home
