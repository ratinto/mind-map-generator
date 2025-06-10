import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

let id = 0;
const getId = () => `node_${id++}`;

export default function MindMapEditor({ 
  initialNodes = [], 
  initialEdges = [], 
  onSave, 
  onBackToDashboard 
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeText, setNodeText] = useState("");
  const [mindMapName, setMindMapName] = useState("Untitled Mind Map");
  const [isSaving, setIsSaving] = useState(false);

  // Reset id counter based on existing nodes
  useEffect(() => {
    if (initialNodes.length > 0) {
      const nodeIds = initialNodes.map(node => node.id);
      const maxId = nodeIds
        .filter(id => id.startsWith('node_'))
        .map(id => parseInt(id.replace('node_', ''), 10))
        .reduce((max, id) => Math.max(max, id), 0);
      
      id = maxId + 1;
    }
  }, [initialNodes]);

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

  const handleSave = () => {
    setIsSaving(true);
    onSave(mindMapName, nodes, edges);
    setIsSaving(false);
  };

  return (
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
        <div className="absolute top-4 left-4 right-4 z-10 bg-white p-3 rounded shadow-lg flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={nodeText}
              onChange={(e) => setNodeText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNode()}
              placeholder="Enter node text"
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addNode}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
            >
              Add Node
            </button>
          </div>
          
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={mindMapName}
              onChange={(e) => setMindMapName(e.target.value)}
              placeholder="Mind Map Name"
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition disabled:bg-green-300"
            >
              {isSaving ? 'Saving...' : 'Save Mind Map'}
            </button>
            <button
              onClick={onBackToDashboard}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <MiniMap pannable="true" zoomable />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
