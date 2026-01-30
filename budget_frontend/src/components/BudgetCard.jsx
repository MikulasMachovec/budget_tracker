import React, { useMemo, useState } from 'react'
import ProgressBar from '../utils/ProgressBar'
import { useAppData } from '../providers/AppDataProvider';

function BudgetCard({ category, expenses }){
    const { id, category_name, allocated_amount } = category
   
    const { spentByCategory, deleteCategory } = useAppData();
	const spentAmount = spentByCategory[category.id] || 0;

    return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition">

  {/* Header row */}
  	<div className="flex items-center justify-between">
    	{/* Left side — name */}
    	<h3 className="text-lg font-semibold text-gray-800 border-b border-b-gray-300">{category_name}</h3>
    

    	{/* Right side — actions button */}
		<div className="flex items-center gap-3 text-sm">
			{/* TODO: add edit feature */}
			<button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
			<button 
				className="text-red-600 hover:text-red-800 font-medium"
				onClick={()=> deleteCategory(category.id)}
			>Delete</button>
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
	

</div>

  );
    }
export default BudgetCard