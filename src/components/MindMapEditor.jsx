import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  useViewport,
} from "reactflow";
import "reactflow/dist/style.css";
import { 
  FiSquare, 
  FiCircle, 
  FiType, 
  FiImage, 
  FiEdit3, 
  FiMove, 
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiSave,
  FiArrowLeft,
  FiMoreHorizontal,
  FiPenTool,
  FiTriangle,
  FiStar,
  FiMessageSquare,
  FiArrowRight,
  FiMinus,
  FiChevronDown,
  FiGrid,
  FiMessageCircle,
  FiShare2
} from "react-icons/fi";
import apiService from "../services/apiService";

let id = 0;
const getId = () => `node_${id++}`;

// Custom Node Components
const ShapeNode = ({ data }) => {
  const { label, shapeType, style = {} } = data;
  
  const baseStyle = {
    padding: '12px',
    borderRadius: '8px',
    background: 'white',
    border: '2px solid #3b82f6',
    fontSize: '14px',
    color: '#1f2937',
    minWidth: '80px',
    textAlign: 'center',
    ...style
  };

  switch (shapeType) {
    case 'rectangle':
      return <div style={{ ...baseStyle, borderRadius: '4px' }}>{label}</div>;
    case 'rounded-rect':
      return <div style={{ ...baseStyle, borderRadius: '12px' }}>{label}</div>;
    case 'circle':
      return <div style={{ ...baseStyle, borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label}</div>;
    case 'diamond':
      return <div style={{ ...baseStyle, transform: 'rotate(45deg)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ transform: 'rotate(-45deg)' }}>{label}</span></div>;
    case 'triangle':
      return <div style={{ ...baseStyle, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', width: '80px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>{label}</div>;
    case 'star':
      return <div style={{ ...baseStyle, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label}</div>;
    case 'speech-bubble':
      return <div style={{ ...baseStyle, borderRadius: '20px', position: 'relative' }}>
        {label}
        <div style={{ position: 'absolute', bottom: '-10px', left: '20px', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid #3b82f6' }}></div>
      </div>;
    case 'arrow':
      return <div style={{ ...baseStyle, clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)', width: '100px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10px' }}>{label}</div>;
    default:
      return <div style={baseStyle}>{label}</div>;
  }
};

const TextNode = ({ data }) => (
  <div style={{
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    color: '#1f2937',
    padding: '8px',
    minWidth: '100px',
    textAlign: 'center'
  }}>
    {data.label}
  </div>
);

const nodeTypes = {
  shape: ShapeNode,
  text: TextNode,
  default: ({ data }) => (
    <div style={{
      padding: '12px 16px',
      borderRadius: '8px',
      background: 'white',
      border: '2px solid #3b82f6',
      fontSize: '14px',
      color: '#1f2937',
      minWidth: '80px',
      textAlign: 'center'
    }}>
      {data.label}
    </div>
  )
};

// Inner component that uses useReactFlow hook
function MindMapEditorContent({
  initialNodes = [],
  initialEdges = [],
  mindMapId,
  onSaved,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeText, setNodeText] = useState("");
  const [name, setName] = useState("Mind Map");
  const [saveStatus, setSaveStatus] = useState("saved"); // saved, saving, unsaved
  const [lastSaved, setLastSaved] = useState(null);
  const [selectedTool, setSelectedTool] = useState("select");
  const [showShapes, setShowShapes] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [startPos, setStartPos] = useState(null);
  const [isCreatingShape, setIsCreatingShape] = useState(false);
  const [isMiddleMousePressed, setIsMiddleMousePressed] = useState(false);
  const [lastPanPosition, setLastPanPosition] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const reactFlowInstance = useReactFlow();
  const viewport = useViewport();

  // Global middle mouse button handler
  useEffect(() => {
    const handleGlobalMouseUp = (e) => {
      if (e.button === 1) {
        setIsMiddleMousePressed(false);
        setLastPanPosition(null);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault();
          handleSave();
        }
        if (e.key === 'Enter' && nodeText.trim()) {
          e.preventDefault();
          addNode();
        }
      }
      if (e.key === 'Escape') {
        setNodeText("");
        setShowShapes(false);
        setSelectedTool('select'); // Reset to select tool on escape
        if (inputRef.current) inputRef.current.blur();
      }
      // Keyboard shortcuts for tools
      if (e.key === 'v') setSelectedTool('select');
      if (e.key === 't') setSelectedTool('text');
      if (e.key === 'r') setSelectedTool('shape-rectangle');
      if (e.key === 'c') setSelectedTool('shape-circle');
      if (e.key === 'm') setSelectedTool('mindmap');
      if (e.key === 'p') setSelectedTool('pen');
      if (e.key === 'e') setSelectedTool('eraser');
      // Clear canvas
      if (e.ctrlKey && e.key === 'Delete') {
        setDrawingPaths([]);
        setNodes([]);
        setEdges([]);
      }
      // Zoom shortcuts
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          const currentViewport = reactFlowInstance.getViewport();
          reactFlowInstance.setViewport({
            x: currentViewport.x,
            y: currentViewport.y,
            zoom: currentViewport.zoom * 1.2
          });
        }
        if (e.key === '-') {
          e.preventDefault();
          const currentViewport = reactFlowInstance.getViewport();
          reactFlowInstance.setViewport({
            x: currentViewport.x,
            y: currentViewport.y,
            zoom: currentViewport.zoom / 1.2
          });
        }
        if (e.key === '0') {
          e.preventDefault();
          reactFlowInstance.fitView({ padding: 0.1 });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nodeText]);

  // Click outside to close shapes panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showShapes && !e.target.closest('.shapes-panel')) {
        setShowShapes(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showShapes]);

  // Mark as unsaved when changes are made
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0 || drawingPaths.length > 0 || name) {
      setSaveStatus("unsaved");
    }
  }, [nodes, edges, name, drawingPaths]);

  // Load mind map if editing
  useEffect(() => {
    if (mindMapId) {
      const fetchMindMap = async () => {
        const result = await apiService.getMindMap(mindMapId);
        if (result.success) {
          setNodes(result.data.nodes);
          setEdges(result.data.edges);
          setName(result.data.name || "Mind Tinker Board");
          setDrawingPaths(result.data.drawing_paths || []);
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

  const addShape = (shapeType) => {
    const newNode = {
      id: getId(),
      type: 'shape',
      data: { 
        label: shapeType.charAt(0).toUpperCase() + shapeType.slice(1),
        shapeType: shapeType
      },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleCanvasClick = useCallback((event) => {
    // Only handle clicks when a creation tool is selected (not pen or shape tools)
    if (selectedTool === "select" || selectedTool === "pen" || selectedTool.startsWith("shape-")) return;
    
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    let newNode;
    
    switch (selectedTool) {
      case 'text':
        newNode = {
          id: getId(),
          type: 'text',
          data: { label: 'Double click to edit' },
          position,
        };
        break;
        
      case 'mindmap':
        if (!nodeText.trim()) {
          // Focus the input if no text is entered
          if (inputRef.current) inputRef.current.focus();
          return;
        }
        newNode = {
          id: getId(),
          type: 'default',
          data: { label: nodeText },
          position,
        };
        setNodeText("");
        break;
        
      default:
        return;
    }

    if (newNode) {
      setNodes((nds) => [...nds, newNode]);
      
      // Reset to select tool after creating a shape (except for mindmap tool)
      if (selectedTool !== 'mindmap') {
        setSelectedTool('select');
      }
    }
  }, [selectedTool, nodeText, setNodes]);

  const handleNodeDoubleClick = useCallback((event, node) => {
    event.stopPropagation();
    const newLabel = prompt('Edit text:', node.data.label);
    if (newLabel !== null) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? { ...n, data: { ...n.data, label: newLabel } }
            : n
        )
      );
    }
  }, [setNodes]);

  // Drawing functions for whiteboard
  const getCanvasCoordinates = (event) => {
    const rect = event.currentTarget?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    // Get screen coordinates
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    
    // Convert screen coordinates to ReactFlow coordinates
    const reactFlowCoords = reactFlowInstance.screenToFlowPosition({
      x: screenX,
      y: screenY
    });
    
    return reactFlowCoords;
  };

  const handleMouseDown = useCallback((event) => {
    if (selectedTool === 'select') return;
    
    const coords = getCanvasCoordinates(event);
    setStartPos(coords);

    if (selectedTool === 'pen') {
      setIsDrawing(true);
      setCurrentPath(`M ${coords.x} ${coords.y}`);
    } else if (selectedTool.startsWith('shape-')) {
      setIsCreatingShape(true);
    }
  }, [selectedTool]);

  const handleMouseMove = useCallback((event) => {
    if (selectedTool === 'select') return;
    
    const coords = getCanvasCoordinates(event);

    if (selectedTool === 'pen' && isDrawing) {
      setCurrentPath(prev => `${prev} L ${coords.x} ${coords.y}`);
    }
  }, [selectedTool, isDrawing]);

  const handleMouseUp = useCallback((event) => {
    if (selectedTool === 'select') return;
    
    const coords = getCanvasCoordinates(event);

    if (selectedTool === 'pen' && isDrawing) {
      setIsDrawing(false);
      if (currentPath) {
        setDrawingPaths(prev => [...prev, {
          id: getId(),
          path: currentPath,
          stroke: '#3b82f6',
          strokeWidth: 2,
          fill: 'none'
        }]);
        setCurrentPath("");
      }
    } else if (selectedTool.startsWith('shape-') && isCreatingShape && startPos) {
      // Create shape with drag dimensions
      const width = Math.abs(coords.x - startPos.x);
      const height = Math.abs(coords.y - startPos.y);
      
      if (width > 10 && height > 10) { // Minimum size threshold
        const position = {
          x: Math.min(startPos.x, coords.x),
          y: Math.min(startPos.y, coords.y)
        };

        let newNode = createShapeNode(selectedTool, position, { width, height });
        setNodes((nds) => [...nds, newNode]);
      }
      
      setIsCreatingShape(false);
      setStartPos(null);
    }
  }, [selectedTool, isDrawing, isCreatingShape, startPos, currentPath, setNodes]);

  const createShapeNode = (shapeType, position, dimensions) => {
    const { width, height } = dimensions;
    
    let nodeData = {};
    
    switch (shapeType) {
      case 'shape-rectangle':
        nodeData = { 
          label: 'Rectangle', 
          shapeType: 'rectangle',
          style: { width: `${width}px`, height: `${height}px` }
        };
        break;
      case 'shape-circle':
        const size = Math.min(width, height);
        nodeData = { 
          label: 'Circle', 
          shapeType: 'circle',
          style: { width: `${size}px`, height: `${size}px` }
        };
        break;
      case 'shape-diamond':
        nodeData = { 
          label: '♦', 
          shapeType: 'diamond',
          style: { width: `${width}px`, height: `${height}px` }
        };
        break;
      default:
        nodeData = { 
          label: shapeType.replace('shape-', '').replace('-', ' '), 
          shapeType: shapeType.replace('shape-', ''),
          style: { width: `${width}px`, height: `${height}px` }
        };
    }

    return {
      id: getId(),
      type: 'shape',
      data: nodeData,
      position,
    };
  };

  // Save to backend
  const handleSave = async () => {
    if (!mindMapId) return;
    
    setSaveStatus("saving");
    
    const result = await apiService.updateMindMap(mindMapId, {
      name,
      nodes,
      edges,
      drawing_paths: drawingPaths,
    });
    
    if (result.success) {
      setSaveStatus("saved");
      setLastSaved(new Date());
      if (onSaved) onSaved(nodes, edges, drawingPaths);
      
      // Show success toast
      showToast("Board saved successfully!", "success");
    } else {
      setSaveStatus("unsaved");
      alert("Failed to save board: " + result.error);
    }
  };

  // Simple toast notification
  const showToast = (message, type = "info") => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 shadow-lg ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  return (
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            
            <div className="w-px h-6 bg-gray-300"></div>
            
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded px-2 py-1 min-w-[200px]"
              placeholder="Untitled"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Save Status */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {saveStatus === "saving" && (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  <span>Saving...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <span className="text-green-600">✓</span>
                  <span>Saved</span>
                </>
              )}
              {saveStatus === "unsaved" && (
                <>
                  <span className="text-orange-500">●</span>
                  <span>Unsaved changes</span>
                </>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <FiSave className="w-4 h-4" />
              Save
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <FiMoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 relative">
          {/* Left Toolbar */}
          <div className="bg-white border-r border-gray-200 w-16 flex flex-col items-center py-4 gap-1 z-10 relative">
            {/* Select Tool */}
            <button
              onClick={() => {setSelectedTool("select"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "select" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Select"
            >
              <FiMove className="w-5 h-5" />
            </button>

            {/* Pen Tool */}
            <button
              onClick={() => {setSelectedTool("pen"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "pen" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Pen - Draw freely (P)"
            >
              <FiPenTool className="w-5 h-5" />
            </button>

            {/* Eraser Tool */}
            <button
              onClick={() => {setSelectedTool("eraser"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "eraser" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Eraser (E)"
            >
              <FiMinus className="w-5 h-5" />
            </button>

            {/* Shapes Tool with Dropdown */}
            <div className="relative shapes-panel">
              <button
                onClick={() => setShowShapes(!showShapes)}
                className={`p-3 rounded-lg transition-colors relative ${
                  selectedTool.includes("shape") || showShapes
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Shapes"
              >
                <FiSquare className="w-5 h-5" />
                <FiChevronDown className="w-3 h-3 absolute -bottom-1 -right-1" />
              </button>

              {/* Shapes Panel */}
              {showShapes && (
                <div className="absolute left-16 top-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 w-64">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Basic Shapes</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => {setSelectedTool("shape-rectangle"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-rectangle"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Rectangle"
                      >
                        <FiSquare className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-rounded-rect"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-rounded-rect"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Rounded Rectangle"
                      >
                        <div className="w-5 h-4 border-2 border-gray-700 rounded"></div>
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-circle"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-circle"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Circle"
                      >
                        <FiCircle className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-diamond"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-diamond"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Diamond"
                      >
                        <div className="w-4 h-4 border-2 border-gray-700 rotate-45"></div>
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-star"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-star"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Star"
                      >
                        <FiStar className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-triangle"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-triangle"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Triangle"
                      >
                        <FiTriangle className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-speech-bubble"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-speech-bubble"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Speech Bubble"
                      >
                        <FiMessageSquare className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      <button
                        onClick={() => {setSelectedTool("shape-arrow"); setShowShapes(false);}}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTool === "shape-arrow"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title="Arrow"
                      >
                        <FiArrowRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <button className="w-full py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      More shapes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Text Tool */}
            <button
              onClick={() => {setSelectedTool("text"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "text" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Text"
            >
              <FiType className="w-5 h-5" />
            </button>

            {/* Mind Map Tool */}
            <button
              onClick={() => {setSelectedTool("mindmap"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "mindmap" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Mind Map Node"
            >
              <FiEdit3 className="w-5 h-5" />
            </button>

            <div className="w-8 h-px bg-gray-300 my-2"></div>

            {/* Image Tool */}
            <button
              onClick={() => {setSelectedTool("image"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "image" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Image"
            >
              <FiImage className="w-5 h-5" />
            </button>

            {/* Comment Tool */}
            <button
              onClick={() => {setSelectedTool("comment"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "comment" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Comment"
            >
              <FiMessageCircle className="w-5 h-5" />
            </button>

            {/* Connection Tool */}
            <button
              onClick={() => {setSelectedTool("connection"); setShowShapes(false);}}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "connection" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Connection"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>

          {/* Main Canvas */}
          <div 
            className="flex-1 relative"
            style={{
              cursor: isMiddleMousePressed ? 'grabbing' : 
                      (selectedTool === 'pen' || selectedTool.startsWith('shape-')) ? 'crosshair' : 'auto'
            }}
            onMouseDown={(e) => {
              // Check for middle mouse button (wheel click)
              if (e.button === 1) {
                setIsMiddleMousePressed(true);
                setLastPanPosition({ x: e.clientX, y: e.clientY });
                e.preventDefault();
                return;
              }
              
              // Handle drawing events at the container level for left mouse button
              if (e.button === 0 && (selectedTool === 'pen' || selectedTool.startsWith('shape-')) && !isMiddleMousePressed) {
                // Only prevent default for drawing tools and when not middle mouse panning
                e.preventDefault();
                handleMouseDown(e);
              }
            }}
            onMouseMove={(e) => {
              // Handle middle mouse panning
              if (isMiddleMousePressed && lastPanPosition) {
                const deltaX = e.clientX - lastPanPosition.x;
                const deltaY = e.clientY - lastPanPosition.y;
                
                // Update viewport position
                const currentViewport = reactFlowInstance.getViewport();
                reactFlowInstance.setViewport({
                  x: currentViewport.x + deltaX,
                  y: currentViewport.y + deltaY,
                  zoom: currentViewport.zoom
                });
                
                setLastPanPosition({ x: e.clientX, y: e.clientY });
                e.preventDefault();
                return;
              }
              
              if (!isMiddleMousePressed && ((selectedTool === 'pen' && isDrawing) || (selectedTool.startsWith('shape-') && isCreatingShape))) {
                e.preventDefault();
                handleMouseMove(e);
              }
            }}
            onMouseUp={(e) => {
              // Handle middle mouse button release
              if (e.button === 1) {
                setIsMiddleMousePressed(false);
                setLastPanPosition(null);
                return;
              }
              
              if (selectedTool === 'pen' || selectedTool.startsWith('shape-')) {
                handleMouseUp(e);
              }
            }}
            onContextMenu={(e) => {
              // Prevent context menu when middle mouse button is used
              if (isMiddleMousePressed) {
                e.preventDefault();
              }
            }}
            onMouseLeave={() => {
              // Stop drawing when mouse leaves the canvas area
              setIsDrawing(false);
              setIsCreatingShape(false);
              // Don't reset middle mouse state here - let global handler handle it
            }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onPaneClick={selectedTool === 'select' ? handleCanvasClick : undefined}
              onNodeDoubleClick={handleNodeDoubleClick}
              nodeTypes={nodeTypes}
              fitView
              proOptions={{ hideAttribution: true }}
              className="bg-white"
              panOnDrag={selectedTool === 'select'}
              zoomOnScroll={true}
              zoomOnPinch={true}
              zoomOnDoubleClick={selectedTool === 'select'}
              nodesDraggable={selectedTool === 'select'}
              nodesConnectable={selectedTool === 'select'}
              elementsSelectable={selectedTool === 'select'}
              minZoom={0.001}
              maxZoom={1000}
            >
              <Background color="#f1f5f9" gap={20} />
              
              <MiniMap 
                nodeColor="rgb(59, 130, 246)" 
                maskColor="rgba(255, 255, 255, 0.6)"
                position="bottom-right"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px"
                }}
              />
            </ReactFlow>

            {/* Drawing Paths Overlay - Transformed to match ReactFlow viewport */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 5 }}
            >
              <svg className="w-full h-full">
                <g transform={`translate(${viewport.x},${viewport.y}) scale(${viewport.zoom})`}>
                  {/* Render saved drawing paths */}
                  {drawingPaths.map((path) => (
                    <path
                      key={path.id}
                      d={path.path}
                      stroke={path.stroke}
                      strokeWidth={path.strokeWidth}
                      fill={path.fill}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  
                  {/* Current drawing path */}
                  {currentPath && (
                    <path
                      d={currentPath}
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </g>
              </svg>
            </div>


            
            {/* Shape Preview Overlay */}
            {isCreatingShape && startPos && (
              <svg 
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 11 }}
              >
              {/* Render saved drawing paths */}
              {drawingPaths.map((path) => (
                <path
                  key={path.id}
                  d={path.path}
                  stroke={path.stroke}
                  strokeWidth={path.strokeWidth}
                  fill={path.fill}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              
              {/* Current drawing path */}
              {currentPath && (
                <path
                  d={currentPath}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Preview shape while dragging */}
              {isCreatingShape && startPos && (
                <>
                  {selectedTool === 'shape-rectangle' && (
                    <rect
                      x={startPos.x}
                      y={startPos.y}
                      width="0"
                      height="0"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="rgba(59, 130, 246, 0.1)"
                      strokeDasharray="5,5"
                    />
                  )}
                  {selectedTool === 'shape-circle' && (
                    <circle
                      cx={startPos.x}
                      cy={startPos.y}
                      r="0"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="rgba(59, 130, 246, 0.1)"
                      strokeDasharray="5,5"
                    />
                  )}
                </>
              )}
            </svg>
          )}

            {/* Tool Instructions */}
            {(selectedTool !== "select" || isMiddleMousePressed) && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm z-10 shadow-lg">
                {isMiddleMousePressed && "Middle mouse pressed - Pan mode active"}
                {!isMiddleMousePressed && selectedTool === "mindmap" && "Enter text below, then click on canvas to add mind map node"}
                {!isMiddleMousePressed && selectedTool === "text" && "Click on canvas to add text (T)"}
                {!isMiddleMousePressed && selectedTool === "pen" && "Click and drag to draw freely (P) | Middle mouse to pan"}
                {!isMiddleMousePressed && selectedTool === "eraser" && "Click on drawings to erase them (E)"}
                {!isMiddleMousePressed && selectedTool.startsWith("shape-") && `Click and drag to draw ${selectedTool.replace('shape-', '').replace('-', ' ')} | Middle mouse to pan`}
                {!isMiddleMousePressed && selectedTool === "image" && "Click on canvas to add image"}
                {!isMiddleMousePressed && selectedTool === "comment" && "Click on canvas to add comment"}
                {!isMiddleMousePressed && selectedTool === "connection" && "Click on canvas to add connection"}
              </div>
            )}

            {/* Whiteboard Controls */}
            <div className="absolute top-6 right-6 bg-white border border-gray-200 rounded-lg shadow-sm p-2 z-10 flex gap-2">
              <button
                onClick={() => {
                  setDrawingPaths([]);
                  setNodes([]);
                  setEdges([]);
                  setSaveStatus("unsaved");
                }}
                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear Canvas (Ctrl+Delete)"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  setDrawingPaths([]);
                  setSaveStatus("unsaved");
                }}
                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                title="Clear Drawings Only"
              >
                Clear Drawings
              </button>
            </div>

            {/* Quick Add Panel for Mind Map */}
            {selectedTool === "mindmap" && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={nodeText}
                    onChange={(e) => setNodeText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNode()}
                    placeholder="Enter text for mind map node..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[250px]"
                    autoFocus
                  />
                  <button
                    onClick={addNode}
                    disabled={!nodeText.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add Node
                  </button>
                  <button
                    onClick={() => setSelectedTool('select')}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-28 right-6 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 z-10">
              <div className="text-xs text-gray-600 text-center">
                {Math.round(viewport.zoom * 100)}%
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col z-10">
              <button 
                className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-200"
                onClick={() => {
                  const currentViewport = reactFlowInstance.getViewport();
                  reactFlowInstance.setViewport({
                    x: currentViewport.x,
                    y: currentViewport.y,
                    zoom: currentViewport.zoom * 1.5
                  });
                }}
                title="Zoom In"
              >
                <FiZoomIn className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-200"
                onClick={() => {
                  const currentViewport = reactFlowInstance.getViewport();
                  reactFlowInstance.setViewport({
                    x: currentViewport.x,
                    y: currentViewport.y,
                    zoom: currentViewport.zoom / 1.5
                  });
                }}
                title="Zoom Out"
              >
                <FiZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  reactFlowInstance.fitView({ padding: 0.1 });
                }}
                title="Fit to View"
              >
                <FiMaximize className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

// Outer component that accepts props and passes them to the inner component
function MindMapEditor(props) {
  return (
    <ReactFlowProvider>
      <MindMapEditorContent {...props} />
    </ReactFlowProvider>
  );
}

export default MindMapEditor;
