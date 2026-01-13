import React from 'react'

export default function ProgressBar({ used , max_amount}) {
    const percentage = Math.min((used / max_amount) *100, 100);

    //Bar colors

    const getColor = ()=>{
        if ( percentage < 65 ) return "bg-green-500";
        if ( percentage < 80 ) return "bg-yellow-500";
        return "bg-red-500";
        };

    return (
        <div className="w-full">
            <div className="flex justify-between mb-1 text-sm text-gray-700 font-medium">
            <span>{used} € /{max_amount} €</span>
            <span>{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                className={`h-3 ${getColor()} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}