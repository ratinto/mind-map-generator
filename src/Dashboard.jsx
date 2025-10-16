import React, { useState } from "react";
import { 
  FiSearch, 
  FiPlus, 
  FiFolder,
  FiEdit3,
  FiClock
} from "react-icons/fi";

export default function Dashboard({ onSelect, onCreate, mindmaps }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("updated");

  const filteredMindmaps = mindmaps?.filter(mm => 
    mm.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const sortedMindmaps = [...filteredMindmaps].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      default: // updated
        return new Date(b.updated_at) - new Date(a.updated_at);
    }
  });

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Mind Maps
              </h1>
            </div>
          </div>
        </div>
      </div> */}

      {/* Search and Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mind maps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="flex gap-4 sm:ml-auto">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="updated">Recently updated</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* Create New Button */}
              <button
                onClick={onCreate}
                className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!mindmaps || mindmaps.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiFolder className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mind maps yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Create your first mind map to start organizing your ideas.
            </p>
            <button
              onClick={onCreate}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Create Your First Mind Map
            </button>
          </div>
        ) : filteredMindmaps.length === 0 ? (
          /* No Search Results */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              No mind maps found matching "<span className="font-medium">{searchTerm}</span>"
            </p>
          </div>
        ) : (
          /* Mind Maps Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedMindmaps.map((mm) => (
              <div
                key={mm.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => onSelect(mm.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <FiEdit3 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2" title={mm.name}>
                    {mm.name}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiFolder className="w-4 h-4 mr-1.5" />
                      {(mm.nodes && mm.nodes.length) || 0} nodes
                    </span>
                    {mm.updated_at && (
                      <span className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1.5" />
                        {getRelativeTime(mm.updated_at)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}