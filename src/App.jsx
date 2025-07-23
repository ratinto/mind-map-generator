import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import MindMapEditor from "./components/MindMapEditor";
import Dashboard from "./Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function DashboardPage({ mindmaps, onSelect, onCreate }) {
  return <Dashboard mindmaps={mindmaps} onSelect={onSelect} onCreate={onCreate} />;
}

function MindMapRoute({ mindmaps, onSelect, selectedId }) {
  const { id } = useParams();
  const [mindmap, setMindmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/mindmaps/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setMindmap(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!mindmap) return <div className="min-h-screen flex items-center justify-center">Mind map not found</div>;

  return (
    <MindMapEditor
      mindMapId={mindmap.id}
      initialNodes={mindmap.nodes}
      initialEdges={mindmap.edges}
      onSaved={() => {}}
    />
  );
}

export default function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id"));
  const [mindmaps, setMindmaps] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch("http://127.0.0.1:8000/api/mindmaps/")
        .then((res) => res.json())
        .then((data) => setMindmaps(data));
    }
  }, [userId]);

  const handleLogin = (id) => {
    setUserId(id);
    window.location.href = "/dashboard";
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    if (id) window.location.href = `/mindmap/${id}`;
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
        window.location.href = `/mindmap/${data.id}`;
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={userId ? (
            <>
              <Navbar
                onCreate={handleCreate}
                onLogout={handleLogout}
              />
              <DashboardPage
                mindmaps={mindmaps}
                onSelect={handleSelect}
                onCreate={handleCreate}
              />
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        />
        <Route
          path="/mindmap/:id"
          element={userId ? (
            <MindMapRoute
              mindmaps={mindmaps}
              onSelect={handleSelect}
            />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
