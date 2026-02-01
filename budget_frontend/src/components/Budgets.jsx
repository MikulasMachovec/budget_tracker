import React, { useState } from 'react'
import BudgetModal from '../utils/BudgetModal'
import BudgetCard from './BudgetCard'
import { useAppData } from '../providers/AppDataProvider';


function Budgets(){
    const [isModalOpen, setIsModalOpen] = useState(false)

   const { categories, expenses } = useAppData();

    return (
        <div className="mx-auto bg-white rounded-2xl border border-gray-200 p-8">
            <div className="w-full self-start text-start pb-3 ">
            <h2 className=" font-semibold text-lg text-gray-700 ">Spending Categories</h2>
            </div>

            <div className="min-w-full border-2  border-gray-200 rounded-lg p-6">

                {/* Create new budget */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' >

                    {/* Budget cards */}
                    {categories?.map((c) => (
                        <BudgetCard 
                        key={c.id} 
                        category={c} 
                        expenses={expenses}
                        />
                    ))}

                    <div
                    onClick={() => setIsModalOpen(true)}
                    className=" hover:shadow-md hover:scale-105 hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-lg p-6 ">
                      <i className="fa-solid fa-plus text-3xl text-blue-600"></i>
                      <p className="font-semibold text-lg text-gray-700">Create Category</p>
                    </div>
                </div>
            </div>
        <BudgetModal
         isOpen={isModalOpen}
         onClose = {() => setIsModalOpen(false)}
         />

        </div>
        )
    }
export default Budgets