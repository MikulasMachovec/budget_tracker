import React, { useMemo, useState } from 'react'
import ProgressBar from '../utils/ProgressBar'
import BudgetModal from '../utils/BudgetModal'
import { useAppData } from '../providers/AppDataProvider';

function BudgetCard({ category, expenses }){
    const { id, category_name, allocated_amount } = category
	const [isModalOpen, setIsModalOpen] = useState(false)
   
    const { spentByCategory, deleteCategory } = useAppData();
	const spentAmount = spentByCategory[category.id] || 0;

    return (
    <div className="flex flex-col gap-3 p-5 transition bg-white shadow-md rounded-xl hover:shadow-lg">

		{/* Header row */}
		<div className="flex items-center justify-between">

    	{/* Left side — name */}
		<h3 className="text-lg font-semibold text-gray-800 border-b border-b-gray-300">{category_name}</h3>
    
    	{/* Right side — actions button */}
		<div className="flex items-center gap-3 text-sm">
			<button 
			className="font-medium text-blue-600 hover:text-blue-800"
			onClick={()=> setIsModalOpen(true)}
			>
				Edit
			</button>

			<button 
				className="font-medium text-red-600 hover:text-red-800"
				onClick={()=> deleteCategory(category.id)}
			>
				Delete
			</button>
		</div>
  	</div>

  {/* Progress info */}
  	<div className="flex flex-col gap-2">
		<div className="flex justify-between text-sm text-gray-600">
			<span>Used: {spentAmount} €</span>
			<span>Limit: {allocated_amount} €</span>
    	</div>

		{/* Progress bar */}
		<ProgressBar used={spentAmount} max_amount={allocated_amount} />
  	</div>

	<BudgetModal
		isOpen={isModalOpen}
		onClose = {() => setIsModalOpen(false)}
		category={category}
	/>
	  
</div>

  );
    }
export default BudgetCard