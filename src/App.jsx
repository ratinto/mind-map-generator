import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MindMapEditor from "./components/MindMapEditor";
import Dashboard from "./Dashboard";

function DashboardPage() {
  const [mindmaps, setMindmaps] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editorKey, setEditorKey] = useState(0); // To force re-mount editor

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/mindmaps/")
      .then((res) => res.json())
      .then((data) => setMindmaps(data));
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    setEditorKey((k) => k + 1); // Force re-mount to reset state
  };

  const handleCreate = () => {
    const name = prompt("Enter new mind map name:");
    if (!name) return;
    fetch("http://127.0.0.1:8000/api/mindmaps/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nodes: [], edges: [] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMindmaps((prev) => [...prev, data]);
        setSelectedId(data.id);
        setEditorKey((k) => k + 1);
      });
  };

  // Find selected mind map data
  const selected = mindmaps.find((mm) => mm.id === selectedId);

  return (
    <div>
      <Dashboard
        onSelect={handleSelect}
        onCreate={handleCreate}
        mindmaps={mindmaps}
        selectedId={selectedId}
      />
      {selected && (
        <MindMapEditor
          key={editorKey}
          mindMapId={selected.id}
          initialNodes={selected.nodes}
          initialEdges={selected.edges}
          onSaved={(nodes, edges) => {
            setMindmaps((prev) =>
              prev.map((mm) =>
                mm.id === selected.id ? { ...mm, nodes, edges } : mm
              )
            );
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
