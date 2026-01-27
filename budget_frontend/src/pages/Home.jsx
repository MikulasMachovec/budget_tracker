import React from 'react';
import MonthAndYear from '../components/Month_and_year.jsx';
import Dashboard from '../components/Dashboard.jsx';
import AddExpense from '../components/AddExpense.jsx';
import Friends from '../components/Friends.jsx';
import Budgets from '../components/Budgets.jsx';
import { useAuth } from '../providers/AuthProvider';
import { useAppData } from '../providers/AppDataProvider';


function Home() {

  const { user } = useAuth();
  const { categories, expenses } = useAppData();
  console.log(expenses)
  console.log(categories)
  
      const userData = {
        ...user, 
        expenses,
        categories,
        monthlyBudget : 2000,
        spending : 1500,
        balance : 500
    
      }
      console.log('userData', userData)
  
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
                  <Dashboard data={userData} />
              </div>
              <div className='square-aspect'>
                  <Friends />
              </div>
          </div>

        <Budgets budget={categories} />

      </main>
    </>
  )
}

export default Home
