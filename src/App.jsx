import React, { useCallback, useState } from "react";
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

export default function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeText, setNodeText] = useState("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  

  const addNode = () => {
    const newNode = {
      id: getId(),
      data: { label: nodeText },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
    };
    setNodes((nds) => [...nds,newNode]);
    setNodeText("");
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
        <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded shadow-lg flex gap-2 items-center">
          <input
            type="text"
            value={nodeText}
            onChange={(e) => setNodeText(e.target.value)}
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

        <MiniMap pannable="true" zoomable />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
