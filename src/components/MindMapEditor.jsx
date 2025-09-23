import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import apiService from "../services/apiService";

let id = 0;
const getId = () => `node_${id++}`;

export default function MindMapEditor({
  initialNodes = [],
  initialEdges = [],
  mindMapId,
  onSaved,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeText, setNodeText] = useState("");
  const [name, setName] = useState("Mind Tinker Board");
  const navigate = useNavigate();

  // Load mind map if editing
  useEffect(() => {
    if (mindMapId) {
      const fetchMindMap = async () => {
        const result = await apiService.getMindMap(mindMapId);
        if (result.success) {
          setNodes(result.data.nodes);
          setEdges(result.data.edges);
          setName(result.data.name || "Mind Tinker Board");
        } else {
          console.error("Failed to load mind map:", result.error);
          alert("Failed to load mind map: " + result.error);
        }
      };
      
      fetchMindMap();
    }
    // eslint-disable-next-line
  }, [mindMapId]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    if (!nodeText.trim()) return;
    const newNode = {
      id: getId(),
      data: { label: nodeText },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeText("");
  };

  // Save to backend
  const handleSave = async () => {
    if (!mindMapId) return;
    
    const result = await apiService.updateMindMap(mindMapId, {
      name,
      nodes,
      edges,
    });
    
    if (result.success) {
      if (onSaved) onSaved(nodes, edges);
      alert("Board saved!");
    } else {
      alert("Failed to save board: " + result.error);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          {/* Top Bar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl z-10 bg-white/90 p-4 rounded-2xl shadow-xl flex items-center gap-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-semibold w-56 mr-4"
              placeholder="Board Name"
              style={{ minWidth: 120 }}
            />
            <input
              type="text"
              value={nodeText}
              onChange={(e) => setNodeText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNode()}
              placeholder="Enter node text"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base flex-1 min-w-[180px]"
            />
            <button
              onClick={addNode}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow"
            >
              Add Node
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow"
            >
              Save Board
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="ml-auto border border-blue-500 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Dashboard
            </button>
          </div>
          <MiniMap pannable="true" zoomable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
