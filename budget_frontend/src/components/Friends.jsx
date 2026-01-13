import React from 'react'

function Friends() {
  return (
    <div className="card flex flex-col items-center justify-center p-6 mt-4 rounded-xl transition hover:scale-105">
      <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-lg p-6 w-48 h-48 hover:bg-gray-50 cursor-pointer transition-all">
        <i className="fa-solid fa-user-plus text-3xl text-blue-600"></i>
        <p className="font-semibold text-lg text-gray-700">Invite Friends</p>
      </div>
    </div>
  );
}

export default Friends