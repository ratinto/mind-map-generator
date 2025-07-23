import React from "react";

export default function Dashboard({ onSelect, onCreate, mindmaps }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 pb-20">
      <div className="w-full max-w-6xl flex flex-col items-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2 mt-6 text-center">Your Mind Tinker Boards</h1>
        <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">Create, organize, and visualize your ideas. Click a card to open a board, or start a new one!</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold text-lg shadow mb-8"
          onClick={onCreate}
        >
          + New Board
        </button>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mindmaps.length === 0 ? (
          <div className="col-span-full text-gray-400 text-center">No boards yet. Create one!</div>
        ) : (
          mindmaps.map((mm) => (
            <div
              key={mm.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer p-8 flex flex-col items-start border border-gray-100 hover:border-blue-400 group"
              onClick={() => onSelect(mm.id)}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600 mb-4 group-hover:bg-blue-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e0e7ff"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="bold">{mm.name.slice(0,2).toUpperCase()}</text>
                </svg>
              </div>
              <div className="text-lg font-semibold text-blue-800 mb-1 truncate w-full" title={mm.name}>{mm.name}</div>
              {/* <div className="text-gray-500 text-sm">Subtitle or info here</div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}