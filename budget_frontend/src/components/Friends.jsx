import React from 'react'

function Friends() {
  return (
    <div className="flex flex-col items-center justify-center p-6 mt-4 transition card rounded-xl hover:scale-105">
      <div className="flex flex-col items-center justify-center w-48 h-48 gap-2 p-6 transition-all border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
        <i className="text-3xl text-blue-600 fa-solid fa-user-plus"></i>
        <p className="text-lg font-semibold text-gray-700">Invite Friends</p>
      </div>
    </div>
  );
}

export default Friends