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
  const { categories, expenses, income } = useAppData();
    
  // TODO: add filter to expensis so it can filter and calculate spending

      const userData = {
        ...user, 
        expenses,
        categories,
        monthlyBudget : 2000,
        spending : 1500,
        balance : 500
    
      }
  console.log(income)
  
  return (
    <>
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <MonthAndYear />

      {/* Dashboard */}
      <section className="justify-center">
        <Dashboard data={userData} />
      </section>

      {/* Budgets */}
      <section>
        <Budgets budget={categories} />
      </section>
    </main>
    </>
  )
}

export default Home
