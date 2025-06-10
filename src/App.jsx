import React, { useState, useEffect } from "react";
import MindMapEditor from "./components/MindMapEditor";
import Dashboard from "./components/Dashboard";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export default function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'editor'
  const [currentMindMapId, setCurrentMindMapId] = useState(null);
  const [savedMindmaps, setSavedMindmaps] = useState([]);
  
  // Load saved mindmaps from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('mindmaps');
    if (savedData) {
      setSavedMindmaps(JSON.parse(savedData));
    }
  }, []);

  const handleCreateNewMindMap = () => {
    setCurrentMindMapId(null);
    setView('editor');
  };

  const handleLoadMindMap = (id) => {
    setCurrentMindMapId(id);
    setView('editor');
  };

  const handleSaveMindMap = (name, nodes, edges) => {
    const timestamp = new Date().toISOString();
    let updatedMindmaps = [...savedMindmaps];
    
    if (currentMindMapId) {
      // Update existing mindmap
      updatedMindmaps = updatedMindmaps.map(mindmap => 
        mindmap.id === currentMindMapId 
          ? { ...mindmap, name, nodes, edges, updatedAt: timestamp }
          : mindmap
      );
    } else {
      // Create new mindmap
      const newMindMap = {
        id: uuidv4(),
        name,
        nodes,
        edges,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      updatedMindmaps.push(newMindMap);
      setCurrentMindMapId(newMindMap.id);
    }
    
    setSavedMindmaps(updatedMindmaps);
    localStorage.setItem('mindmaps', JSON.stringify(updatedMindmaps));
    
    // Show success notification
    alert(`Mind map "${name}" saved successfully!`);
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  // Get current mindmap data if editing existing one
  const getCurrentMindMapData = () => {
    if (!currentMindMapId) return { initialNodes: [], initialEdges: [] };
    
    const currentMindMap = savedMindmaps.find(m => m.id === currentMindMapId);
    if (!currentMindMap) return { initialNodes: [], initialEdges: [] };
    
    return {
      initialNodes: currentMindMap.nodes,
      initialEdges: currentMindMap.edges
    };
  };

  return (
    <div className="app-container">
      {view === 'dashboard' ? (
        <Dashboard 
          savedMindmaps={savedMindmaps}
          onLoadMindmap={handleLoadMindMap}
          onCreateNew={handleCreateNewMindMap}
        />
      ) : (
        <MindMapEditor 
          {...getCurrentMindMapData()}
          onSave={handleSaveMindMap}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}
