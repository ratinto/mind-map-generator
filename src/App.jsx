import React, { useCallback, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

let id = 0
const getId = () => `node_${id++}`

export default function App() {
  const initialNodes = [
    {
      id: getId(),
      type: 'default',
      data: { label: 'Main Topic' },
      position: { x: 250, y: 5 },
    },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = () => {
    const newNode = {
      id: getId(),
      data: { label: `New Idea` },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={addNode} style={{ position: 'absolute', zIndex: 10, left: 10, top: 10 }}>
        Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
