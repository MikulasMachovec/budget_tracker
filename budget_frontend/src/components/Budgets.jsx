import React, { useState } from 'react'
import BudgetModal from '../utils/BudgetModal'
import BudgetCard from './BudgetCard'
import { useAppData } from '../providers/AppDataProvider';


function Budgets(){
    const [isModalOpen, setIsModalOpen] = useState(false)

   const { categories, expenses } = useAppData();

    return (
        <div className="p-8 mx-auto bg-white border border-gray-200 rounded-2xl">
            <div className="self-start w-full pb-3 text-start ">
            <h2 className="text-lg font-semibold text-gray-700 ">Spending Categories</h2>
            </div>

            <div className="min-w-full p-6 border-2 border-gray-200 rounded-lg">

                {/* Create new budget */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' >

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
                    className="flex flex-col items-center justify-center gap-2 p-6 transition border border-gray-200 rounded-lg hover:shadow-md hover:scale-105 hover:bg-gray-50">
                      <i className="text-3xl text-blue-600 fa-solid fa-plus"></i>
                      <p className="text-lg font-semibold text-gray-700">Create Category</p>
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