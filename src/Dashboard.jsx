import React, { useEffect, useState } from "react";

export default function Dashboard({ onSelect, onCreate, mindmaps, selectedId }) {
  return (
    <div className="p-4 flex gap-4 items-center">
      <button className="bg-blue-500 text-white px-4 py-2" onClick={onCreate}>
        New Mind Map
      </button>
      <select
        value={selectedId || ""}
        onChange={(e) => onSelect(Number(e.target.value))}
        className="border p-2"
      >
        <option value="">Select Mind Map</option>
        {mindmaps.map((mm) => (
          <option key={mm.id} value={mm.id}>
            {mm.name}
          </option>
        ))}
      </select>
    </div>
  );
} 