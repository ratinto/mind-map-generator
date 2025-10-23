import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import MindMapEditor from "./components/MindMapEditor";
import Dashboard from "./Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PrivacyPolicy from "./PrivacyPolicy";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import apiService from "./services/apiService";
import Footer from "./components/Footer";


function DashboardPage({ mindmaps, onSelect, onCreate }) {
  return <Dashboard mindmaps={mindmaps} onSelect={onSelect} onCreate={onCreate} />;
}

function MindMapRoute({ mindmaps, onSelect, selectedId }) {
  const { id } = useParams();
  const [mindmap, setMindmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMindMap = async () => {
      setLoading(true);
      const result = await apiService.getMindMap(id);
      
      if (result.success) {
        setMindmap(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchMindMap();
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

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [mindmaps, setMindmaps] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMindMaps();
    }
  }, [isAuthenticated]);

  const fetchMindMaps = async () => {
    const result = await apiService.getMindMaps();
    if (result.success) {
      setMindmaps(result.data);
    } else {
      console.error('Failed to fetch mind maps:', result.error);
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    if (id) window.location.href = `/mindmap/${id}`;
  };

  const handleCreate = async () => {
    const name = prompt("Enter new mind map name:");
    if (!name) return;
    
    const result = await apiService.createMindMap({ 
      name, 
      nodes: [], 
      edges: [] 
    });
    
    if (result.success) {
      setMindmaps((prev) => [...prev, result.data]);
      setSelectedId(result.data.id);
      window.location.href = `/mindmap/${result.data.id}`;
    } else {
      alert('Failed to create mind map: ' + result.error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar
              onCreate={handleCreate}
              onLogout={logout}
            />
            <DashboardPage
              mindmaps={mindmaps}
              onSelect={handleSelect}
              onCreate={handleCreate}
            />
            <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mindmap/:id"
        element={
          <ProtectedRoute>
            <MindMapRoute
              mindmaps={mindmaps}
              onSelect={handleSelect}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
