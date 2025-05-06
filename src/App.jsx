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
  const initialNodes = [
    {
      id: getId(),
      type: "default",
      data: { label: "Main Topic" },
      position: { x: 250, y: 5 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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
    setNodes((nds) => [...nds, newNode]);
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
        <input
        type="text"
        onChange={(e) => setNodeText(e.target.value)}
        className="bg-red-100"
      />
      <button
        onClick={addNode}
        className="absolute top-2 left-2 z-10 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
      >
        Add Node
      </button>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
