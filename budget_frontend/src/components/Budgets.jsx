import React, { useState } from 'react'
import CreateBudgetModal from '../utils/CreateBudgetModal'
import BudgetCard from './BudgetCard'


function Budgets({ budget }){
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSaveBudget = (e) =>{
        console.log('New expense', e.data)
        }

    return (
        <div className="card flex flex-col items-center justify-center p-6 rounded-xl">
            <div className="w-full self-start text-start pb-3 ">
            <h2 className=" font-semibold text-lg text-gray-700 ">Spending Categories</h2>
            </div>

            <div className="min-w-full border-2 border-dashed border-gray-400 rounded-lg p-6">

                {/* Create new budget */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' >

                    {/* Budget cards */}
                    {budget.map((b) => (
                        <BudgetCard key={b.id} data={b} />
                    ))}

                    <div
                    onClick={() => setIsModalOpen(true)}
                    className=" hover:shadow-md hover:scale-105 hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-lg p-6 ">
                      <i className="fa-solid fa-plus text-3xl text-blue-600"></i>
                      <p className="font-semibold text-lg text-gray-700">Create Category</p>
                    </div>
                </div>
            </div>
        <CreateBudgetModal
         isOpen={isModalOpen}
         onClose = {() => setIsModalOpen(false)}
         onSave = {handleSaveBudget}
         />

        </div>
        )
    }
export default Budgets