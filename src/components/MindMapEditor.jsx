import React, { useCallback, useState, useEffect } from "react";
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

  // Load mind map if editing
  useEffect(() => {
    if (mindMapId) {
      fetch(`http://127.0.0.1:8000/api/mindmaps/${mindMapId}/`)
        .then((res) => res.json())
        .then((data) => {
          setNodes(data.nodes);
          setEdges(data.edges);
        });
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
  const handleSave = () => {
    if (!mindMapId) return;
    fetch(`http://127.0.0.1:8000/api/mindmaps/${mindMapId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Mind Map", // Optionally allow renaming
        nodes,
        edges,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (onSaved) onSaved(nodes, edges);
        alert("Mind map saved!");
      });
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
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                Save Mind Map
              </button>
            </div>
          </div>
          <MiniMap pannable="true" zoomable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
