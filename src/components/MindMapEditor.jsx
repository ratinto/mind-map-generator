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
  FiSliders,
  FiDroplet,
  FiGrid,
  FiMessageCircle,
  FiShare2
} from "react-icons/fi";
import apiService from "../services/apiService";

let id = 0;
const getId = () => `node_${id++}`;

// Custom Node Components
const ShapeNode = ({ data }) => {
  const { label, shapeType, style = {}, strokeWidth = 2, color = '#3b82f6' } = data;
  
  const baseStyle = {
    padding: '12px',
    borderRadius: '8px',
    background: 'transparent',
    border: `${strokeWidth}px solid ${color}`,
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
      return <div style={{ ...baseStyle, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label}</div>;
    case 'triangle':
      const triangleWidth = parseInt(style?.width) || 80;
      const triangleHeight = parseInt(style?.height) || 70;
      const trianglePoints = `${triangleWidth/2},5 5,${triangleHeight-5} ${triangleWidth-5},${triangleHeight-5}`;
      
      return (
        <div style={{ ...baseStyle, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width={triangleWidth} height={triangleHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
            <polygon
              points={trianglePoints}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </svg>
          <span style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>{label}</span>
        </div>
      );
    case 'star':
      const starWidth = parseInt(style?.width) || 80;
      const starHeight = parseInt(style?.height) || 80;
      const starCenterX = starWidth / 2;
      const starCenterY = starHeight / 2;
      const starOuterRadius = Math.min(starWidth, starHeight) / 2 - 5; // Leave some margin for stroke
      const starInnerRadius = starOuterRadius * 0.4;
      
      let starPoints = '';
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
        const x = starCenterX + radius * Math.cos(angle);
        const y = starCenterY + radius * Math.sin(angle);
        starPoints += `${x},${y} `;
      }
      
      return (
        <div style={{ ...baseStyle, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width={starWidth} height={starHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
            <polygon
              points={starPoints.trim()}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </svg>
          <span style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 'bold' }}>{label}</span>
        </div>
      );
    case 'speech-bubble':
      return <div style={{ ...baseStyle, borderRadius: '20px', position: 'relative' }}>
        {label}
        <div style={{ position: 'absolute', bottom: '-10px', left: '20px', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `10px solid ${color}` }}></div>
      </div>;
    case 'arrow':
      const arrowWidth = parseInt(style?.width) || 100;
      const arrowHeight = parseInt(style?.height) || 50;
      
      // Use directional coordinates if available
      if (data.startCoords && data.endCoords) {
        // Calculate relative coordinates within the bounding box
        const minX = Math.min(data.startCoords.x, data.endCoords.x);
        const minY = Math.min(data.startCoords.y, data.endCoords.y);
        
        const relativeStartX = data.startCoords.x - minX;
        const relativeStartY = data.startCoords.y - minY;
        const relativeEndX = data.endCoords.x - minX;
        const relativeEndY = data.endCoords.y - minY;
        
        const dx = relativeEndX - relativeStartX;
        const dy = relativeEndY - relativeStartY;
        const angle = Math.atan2(dy, dx);
        const arrowheadSize = 12;
        
        return (
          <div style={{ ...baseStyle, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width={arrowWidth} height={arrowHeight} style={{ position: 'absolute', top: 0, left: 0 }} viewBox={`0 0 ${arrowWidth} ${arrowHeight}`}>
              <line
                x1={relativeStartX}
                y1={relativeStartY}
                x2={relativeEndX}
                y2={relativeEndY}
                stroke={color}
                strokeWidth={strokeWidth}
              />
              <polygon
                points={`${relativeEndX},${relativeEndY} ${relativeEndX - arrowheadSize * Math.cos(angle - Math.PI / 6)},${relativeEndY - arrowheadSize * Math.sin(angle - Math.PI / 6)} ${relativeEndX - arrowheadSize * Math.cos(angle + Math.PI / 6)},${relativeEndY - arrowheadSize * Math.sin(angle + Math.PI / 6)}`}
                fill={color}
                stroke={color}
                strokeWidth={strokeWidth}
              />
            </svg>
            <span style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 'bold', color: '#1f2937', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2px 4px', borderRadius: '2px' }}>{label}</span>
          </div>
        );
      }
      
      // Fallback to polygon arrow if no directional data
      const arrowPoints = `5,${arrowHeight*0.2} ${arrowWidth*0.6},${arrowHeight*0.2} ${arrowWidth*0.6},5 ${arrowWidth-5},${arrowHeight/2} ${arrowWidth*0.6},${arrowHeight-5} ${arrowWidth*0.6},${arrowHeight*0.8} 5,${arrowHeight*0.8}`;
      
      return (
        <div style={{ ...baseStyle, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width={arrowWidth} height={arrowHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
            <polygon
              points={arrowPoints}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </svg>
          <span style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 'bold', marginLeft: '5px' }}>{label}</span>
        </div>
      );
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
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveDelay, setAutoSaveDelay] = useState(3); // seconds to wait after activity stops
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const autoSaveTimerRef = useRef(null);
  const activityTimerRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState("select");
  const [showShapes, setShowShapes] = useState(false);
  const [showPenOptions, setShowPenOptions] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showThicknessPicker, setShowThicknessPicker] = useState(false);
  const [penColor, setPenColor] = useState('#3b82f6');
  const [penThickness, setPenThickness] = useState(2);
  const [shapeStrokeThickness, setShapeStrokeThickness] = useState(2);
  const [shapeColor, setShapeColor] = useState('#3b82f6');
  const [globalColor, setGlobalColor] = useState('#3b82f6'); // Shared color for all tools
  const [globalThickness, setGlobalThickness] = useState(2); // Shared thickness for all tools
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [screenStartPos, setScreenStartPos] = useState(null);
  const [screenCurrentPos, setScreenCurrentPos] = useState(null);
  const [isCreatingShape, setIsCreatingShape] = useState(false);
  const [isMiddleMousePressed, setIsMiddleMousePressed] = useState(false);
  const [lastPanPosition, setLastPanPosition] = useState(null);
  const [isErasing, setIsErasing] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const reactFlowInstance = useReactFlow();
  const viewport = useViewport();

  // Helper function to close all dialogs
  const closeAllDialogs = () => {
    setShowShapes(false);
    setShowPenOptions(false);
    setShowColorPicker(false);
    setShowThicknessPicker(false);
  };

  // Helper function to set tool and manage its associated dialog
  const selectTool = (toolName) => {
    closeAllDialogs(); // Close all dialogs first
    
    // Handle special case for "shapes" - set to rectangle by default
    if (toolName === 'shapes') {
      setSelectedTool('shape-rectangle');
      setShowShapes(true);
    } else {
      setSelectedTool(toolName);
      
      // Open the appropriate dialog for tools that have them
      if (toolName === 'pen') {
        setShowPenOptions(true);
      } else if (toolName.includes('shape')) {
        setShowShapes(true);
      }
    }
  };

  // Global middle mouse button handler
  useEffect(() => {
    const handleGlobalMouseUp = (e) => {
      if (e.button === 1) {
        setIsMiddleMousePressed(false);
        setLastPanPosition(null);
      }
    };

    // Also reset on any mouse up to be safe
    const handleAnyMouseUp = () => {
      setIsMiddleMousePressed(false);
      setLastPanPosition(null);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseup', handleAnyMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseup', handleAnyMouseUp);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if user is typing in an input field, textarea, or contenteditable element
      const activeElement = document.activeElement;
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true' ||
        activeElement.isContentEditable
      );

      // If user is typing, only allow escape key to work
      if (isTyping) {
        if (e.key === 'Escape') {
          setNodeText("");
          closeAllDialogs();
          setSelectedTool('select');
          if (inputRef.current) inputRef.current.blur();
          if (activeElement) activeElement.blur();
        }
        return; // Don't process other shortcuts while typing
      }

      // Handle Ctrl/Cmd shortcuts
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault();
          handleSave();
        }
        if (e.key === 'Enter' && nodeText.trim()) {
          e.preventDefault();
          addNode();
        }
        // Clear canvas
        if (e.key === 'Delete') {
          const nodeCount = nodes.length;
          const pathCount = drawingPaths.length;
          setDrawingPaths([]);
          setNodes([]);
          setEdges([]);
          if (nodeCount > 0 || pathCount > 0) {
            showToast("Canvas cleared successfully!", "info");
          }
        }
        // Zoom shortcuts
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          const currentViewport = reactFlowInstance.getViewport();
          reactFlowInstance.setViewport({
            x: currentViewport.x,
            y: currentViewport.y,
            zoom: Math.min(currentViewport.zoom * 1.2, 1000)
          });
        }
        if (e.key === '-') {
          e.preventDefault();
          const currentViewport = reactFlowInstance.getViewport();
          reactFlowInstance.setViewport({
            x: currentViewport.x,
            y: currentViewport.y,
            zoom: Math.max(currentViewport.zoom * 0.8, 0.001)
          });
        }
        if (e.key === '0') {
          e.preventDefault();
          reactFlowInstance.fitView({ padding: 0.1 });
        }
        return; // Don't process tool shortcuts when Ctrl/Cmd is pressed
      }

      // Non-modifier key shortcuts (only when not typing)
      if (e.key === 'Escape') {
        setNodeText("");
        closeAllDialogs();
        setSelectedTool('select');
        if (inputRef.current) inputRef.current.blur();
      }
      
      // Tool shortcuts
      if (e.key === 'v') {
        selectTool('select');
      }
      if (e.key === 't') {
        selectTool('text');
      }
      if (e.key === 'r') {
        selectTool('shape-rectangle');
      }
      if (e.key === 'c') {
        selectTool('shape-circle');
      }
      if (e.key === 'm') {
        selectTool('mindmap');
      }
      if (e.key === 'p') {
        selectTool('pen');
      }
      if (e.key === 'e') {
        selectTool('eraser');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nodeText]);

  // Click outside to close panels
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showShapes && !e.target.closest('.shapes-panel')) {
        setShowShapes(false);
      }
      if (showPenOptions && !e.target.closest('.pen-options-panel')) {
        setShowPenOptions(false);
      }
      if (showColorPicker && !e.target.closest('.color-picker-panel')) {
        setShowColorPicker(false);
      }
      if (showThicknessPicker && !e.target.closest('.thickness-picker-panel')) {
        setShowThicknessPicker(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showShapes, showPenOptions, showColorPicker, showThicknessPicker]);

  // Mark as unsaved when changes are made and track activity
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0 || drawingPaths.length > 0 || name) {
      setSaveStatus("unsaved");
      if (!hasUnsavedChanges) {
        setHasUnsavedChanges(true);
      }
      trackUserActivity(); // Track that user is making changes
    }
  }, [nodes, edges, name, drawingPaths]); // Removed hasUnsavedChanges from deps to avoid infinite loop

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
          showToast("Failed to load mind map: " + result.error, "error");
        }
      };
      
      fetchMindMap();
    }
    // eslint-disable-next-line
  }, [mindMapId]);

  // Auto-save cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
      }
    };
  }, []);

  // Clear timers when auto-save is disabled
  useEffect(() => {
    if (!autoSaveEnabled) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
      }
      setIsUserActive(false);
    }
  }, [autoSaveEnabled]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    if (!nodeText.trim()) return;
    trackUserActivity(); // Track node addition
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
    showToast(`Node "${nodeText}" added successfully!`, "success");
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
    // Convert screen coordinates directly to ReactFlow coordinates
    // ReactFlow's screenToFlowPosition handles the viewport transformation internally
    try {
      const reactFlowCoords = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });
      return reactFlowCoords;
    } catch (error) {
      // Fallback if screenToFlowPosition fails
      console.warn('screenToFlowPosition failed, using fallback', error);
      return { x: event.clientX, y: event.clientY };
    }
  };

  // Convert ReactFlow coordinates to screen coordinates for preview
  const flowToScreenCoordinates = (flowCoords) => {
    try {
      const screenCoords = reactFlowInstance.flowToScreenPosition(flowCoords);
      return screenCoords;
    } catch (error) {
      // Fallback if flowToScreenPosition fails
      console.warn('flowToScreenPosition failed, using fallback', error);
      return flowCoords;
    }
  };

  const handleMouseDown = useCallback((event) => {
    if (selectedTool === 'select') return;
    
    trackUserActivity(); // Track user interaction
    
    // Get ReactFlow coordinates for actual shape creation
    const coords = getCanvasCoordinates(event);
    setStartPos(coords);
    setCurrentPos(coords);

    if (selectedTool === 'pen') {
      setIsDrawing(true);
      setCurrentPath(`M ${coords.x} ${coords.y}`);
    } else if (selectedTool === 'eraser') {
      setIsErasing(true);
      performErase(coords, event);
    } else if (selectedTool.startsWith('shape-')) {
      // Get screen coordinates for preview
      const rect = event.currentTarget.getBoundingClientRect();
      const screenCoords = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      setScreenStartPos(screenCoords);
      setScreenCurrentPos(screenCoords);
      setIsCreatingShape(true);
    }
  }, [selectedTool]);

  const handleMouseMove = useCallback((event) => {
    if (selectedTool === 'select') return;
    
    const coords = getCanvasCoordinates(event);

    if (selectedTool === 'pen' && isDrawing) {
      trackUserActivity(); // Track continuous drawing
      setCurrentPath(prev => `${prev} L ${coords.x} ${coords.y}`);
    } else if (selectedTool === 'eraser') {
      setCurrentPos(coords); // Always update position for eraser cursor
      if (isErasing) {
        trackUserActivity(); // Track erasing
        performErase(coords, event);
      }
    } else if (selectedTool.startsWith('shape-') && isCreatingShape) {
      trackUserActivity(); // Track shape creation
      // Update ReactFlow coordinates
      setCurrentPos(coords);
      
      // Update screen coordinates for preview
      const rect = event.currentTarget.getBoundingClientRect();
      const screenCoords = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      setScreenCurrentPos(screenCoords);
    }
  }, [selectedTool, isDrawing, isErasing, isCreatingShape]);

  const handleMouseUp = useCallback((event) => {
    if (selectedTool === 'select') return;
    
    const coords = getCanvasCoordinates(event);

    if (selectedTool === 'pen' && isDrawing) {
      setIsDrawing(false);
      if (currentPath) {
        setDrawingPaths(prev => [...prev, {
          id: getId(),
          path: currentPath,
          stroke: globalColor,
          strokeWidth: globalThickness,
          fill: 'none'
        }]);
        setCurrentPath("");
      }
    } else if (selectedTool === 'eraser' && isErasing) {
      setIsErasing(false);
    } else if (selectedTool.startsWith('shape-') && isCreatingShape && startPos) {
      // Create shape with drag dimensions
      const width = Math.abs(coords.x - startPos.x);
      const height = Math.abs(coords.y - startPos.y);
      
      if (width > 10 && height > 10) { // Minimum size threshold
        const position = {
          x: Math.min(startPos.x, coords.x),
          y: Math.min(startPos.y, coords.y)
        };

        let newNode;
        if (selectedTool === 'shape-arrow') {
          // For arrows, pass the actual start and end coordinates for direction
          newNode = createShapeNode(selectedTool, position, { width, height }, startPos, coords);
        } else {
          newNode = createShapeNode(selectedTool, position, { width, height });
        }
        setNodes((nds) => [...nds, newNode]);
      }
      
      setIsCreatingShape(false);
      setStartPos(null);
      setCurrentPos(null);
      setScreenStartPos(null);
      setScreenCurrentPos(null);
    }
  }, [selectedTool, isDrawing, isErasing, isCreatingShape, startPos, currentPath, setNodes]);

  // Eraser functionality
  const performErase = useCallback((coords, event) => {
    const screenPos = {
      x: event.clientX,
      y: event.clientY
    };

    const eraserRadius = globalThickness * 3; // Use thickness * 3 for eraser size

    // Erase drawing paths that intersect with eraser position
    setDrawingPaths(prevPaths => {
      return prevPaths.filter(pathObj => {
        return !isPathNearPoint(pathObj.path, coords, eraserRadius / viewport.zoom);
      });
    });

    // Check if any nodes are under the eraser
    const erasedNodeIds = [];
    nodes.forEach(node => {
      const nodeScreenPos = flowToScreenPosition({ x: node.position.x, y: node.position.y });
      const distance = Math.sqrt(
        Math.pow(screenPos.x - nodeScreenPos.x, 2) + 
        Math.pow(screenPos.y - nodeScreenPos.y, 2)
      );
      
      if (distance < eraserRadius) {
        erasedNodeIds.push(node.id);
      }
    });

    // Remove nodes that were erased
    if (erasedNodeIds.length > 0) {
      setNodes(prevNodes => prevNodes.filter(node => !erasedNodeIds.includes(node.id)));
      setEdges(prevEdges => prevEdges.filter(edge => 
        !erasedNodeIds.includes(edge.source) && !erasedNodeIds.includes(edge.target)
      ));
      
      if (erasedNodeIds.length === 1) {
        showToast("Node erased", "info");
      } else {
        showToast(`${erasedNodeIds.length} nodes erased`, "info");
      }
    }
  }, [globalThickness, viewport.zoom, nodes, setNodes, setEdges]);

  // Helper function to check if a path is near a point
  const isPathNearPoint = (pathString, point, threshold) => {
    try {
      // Parse the SVG path string and check if any part is near the point
      const commands = pathString.split(/(?=[MLZ])/);
      
      for (let command of commands) {
        const coords = command.match(/-?\d+\.?\d*/g);
        if (coords && coords.length >= 2) {
          const x = parseFloat(coords[0]);
          const y = parseFloat(coords[1]);
          const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
          
          if (distance < threshold) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const createShapeNode = (shapeType, position, dimensions, startCoords = null, endCoords = null) => {
    const { width, height } = dimensions;
    
    let nodeData = {};
    
    switch (shapeType) {
      case 'shape-rectangle':
        nodeData = { 
          label: 'Rectangle', 
          shapeType: 'rectangle',
          style: { width: `${width}px`, height: `${height}px` },
          strokeWidth: Math.min(globalThickness, 8),
          color: globalColor
        };
        break;
      case 'shape-circle':
        nodeData = { 
          label: 'Circle', 
          shapeType: 'circle',
          style: { width: `${width}px`, height: `${height}px` },
          strokeWidth: Math.min(globalThickness, 8),
          color: globalColor
        };
        break;
      case 'shape-arrow':
        nodeData = { 
          label: 'Arrow', 
          shapeType: 'arrow',
          style: { width: `${width}px`, height: `${height}px` },
          strokeWidth: Math.min(globalThickness, 8),
          color: globalColor,
          startCoords,
          endCoords
        };
        break;
      default:
        nodeData = { 
          label: shapeType.replace('shape-', '').replace('-', ' '), 
          shapeType: shapeType.replace('shape-', ''),
          style: { width: `${width}px`, height: `${height}px` },
          strokeWidth: Math.min(globalThickness, 8),
          color: globalColor
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
      showToast("Failed to save board: " + result.error, "error");
    }
  };

  // Auto-save functionality - triggered when user stops activity
  const performAutoSave = async () => {
    if (!hasUnsavedChanges || !autoSaveEnabled || !mindMapId) return;
    
    setSaveStatus("saving");
    const data = {
      name,
      nodes,
      edges,
      drawing_paths: drawingPaths,
    };

    const result = await apiService.updateMindMap(mindMapId, data);
    if (result.success) {
      setSaveStatus("saved");
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setIsUserActive(false);
      showToast("Auto-saved successfully", "success");
    } else {
      setSaveStatus("unsaved");
      showToast("Auto-save failed: " + result.error, "warning");
    }
  };

  // Track user activity and trigger auto-save after inactivity
  const trackUserActivity = () => {
    setIsUserActive(true);
    
    // Clear existing timers
    if (activityTimerRef.current) {
      clearTimeout(activityTimerRef.current);
    }
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    // Set timer to detect when user stops being active
    activityTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
      
      // After user becomes inactive, wait for auto-save delay then save
      if (autoSaveEnabled && hasUnsavedChanges) {
        autoSaveTimerRef.current = setTimeout(() => {
          performAutoSave();
        }, autoSaveDelay * 1000);
      }
    }, 100); // 100ms debounce for activity detection
  };



  // Enhanced toast notification system
  const showToast = (message, type = "info") => {
    const toast = document.createElement('div');
    
    // Icons for different toast types
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    // Colors for different toast types
    const colors = {
      success: 'bg-green-500 border-green-600',
      error: 'bg-red-500 border-red-600', 
      warning: 'bg-yellow-500 border-yellow-600',
      info: 'bg-blue-500 border-blue-600'
    };
    
    toast.className = `fixed top-4 right-4 px-4 py-3 rounded-lg text-white z-50 shadow-lg border-l-4 ${colors[type] || colors.info} transition-all duration-300 transform translate-x-0 opacity-100 max-w-sm`;
    
    toast.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-sm font-bold">
          ${icons[type] || icons.info}
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium leading-tight">${message}</p>
        </div>
        <button class="flex-shrink-0 ml-2 text-white hover:text-gray-200 focus:outline-none" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;
    
    // Add entry animation
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    
    document.body.appendChild(toast);
    
    // Trigger entry animation
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }
    }, 5000);
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
              onChange={e => {
                setName(e.target.value);
                trackUserActivity(); // Track title editing
              }}
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

            {/* Auto-save activity indicator */}
            {autoSaveEnabled && hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {isUserActive ? (
                  <>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Editing...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Will auto-save in {autoSaveDelay}s when you stop</span>
                  </>
                )}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <FiSave className="w-4 h-4" />
              Save
            </button>

            {/* Auto-save toggle */}
            <button
              onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                autoSaveEnabled 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={`Auto-save: ${autoSaveEnabled ? 'ON' : 'OFF'} (${autoSaveDelay}s after activity stops)`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
              onClick={() => selectTool("select")}
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
            <div className="relative pen-options-panel">
              <button
                onClick={() => {
                  selectTool("pen");
                  // Reset middle mouse state to ensure cursor shows correctly
                  setIsMiddleMousePressed(false);
                  setLastPanPosition(null);
                }}
                className={`p-3 rounded-lg transition-colors flex items-center gap-1 ${
                  selectedTool === "pen" 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Pen - Draw freely (P)"
              >
                <FiPenTool className="w-5 h-5" />
                <FiChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Eraser Tool */}
            <button
              onClick={() => selectTool("eraser")}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === "eraser" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Eraser (E)"
            >
              <FiMinus className="w-5 h-5" />
            </button>

            {/* Color Picker Tool */}
            <div className="relative color-picker-panel">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`p-3 rounded-lg transition-colors relative ${
                  showColorPicker
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Color Picker"
              >
                <div className="flex items-center gap-1">
                  <div 
                    className="w-5 h-5 rounded-full border-2 border-gray-400"
                    style={{ backgroundColor: globalColor }}
                  />
                </div>
              </button>

              {/* Color Picker Dropdown */}
              {showColorPicker && (
                <div className="absolute left-16 top-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 w-64">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Colors</h3>
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setGlobalColor(color);
                          setPenColor(color);
                          setShapeColor(color);
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          globalColor === color
                            ? "border-gray-400 scale-110"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {['#1f2937', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6', '#ffffff'].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setGlobalColor(color);
                          setPenColor(color);
                          setShapeColor(color);
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          globalColor === color
                            ? "border-gray-400 scale-110"
                            : "border-gray-200 hover:border-gray-300"
                        } ${color === '#ffffff' ? 'border-gray-300' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Thickness Picker Tool */}
            <div className="relative thickness-picker-panel">
              <button
                onClick={() => setShowThicknessPicker(!showThicknessPicker)}
                className={`p-3 rounded-lg transition-colors relative ${
                  showThicknessPicker
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Thickness Picker"
              >
                <div className="flex items-center gap-1">
                  <FiSliders className="w-4 h-4" />
                  <div 
                    className="rounded-full bg-gray-700"
                    style={{ 
                      width: `${Math.max(globalThickness / 2, 2)}px`, 
                      height: `${Math.max(globalThickness / 2, 2)}px` 
                    }}
                  />
                </div>
              </button>

              {/* Thickness Picker Dropdown */}
              {showThicknessPicker && (
                <div className="absolute left-16 top-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 w-64">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Thickness</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={globalThickness}
                      onChange={(e) => {
                        const thickness = Number(e.target.value);
                        setGlobalThickness(thickness);
                        setPenThickness(thickness);
                        setShapeStrokeThickness(Math.min(thickness, 8)); // Cap shapes at 8px
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">1px</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="rounded-full"
                          style={{ 
                            backgroundColor: globalColor,
                            width: `${Math.max(globalThickness, 2)}px`, 
                            height: `${Math.max(globalThickness, 2)}px` 
                          }}
                        />
                        <span className="text-xs text-gray-600">{globalThickness}px</span>
                      </div>
                      <span className="text-xs text-gray-500">20px</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <p>• Pen: 1-20px</p>
                    <p>• Shapes: 1-8px (capped)</p>
                    <p>• Eraser: 3x thickness</p>
                  </div>
                </div>
              )}
            </div>

            {/* Shapes Tool with Dropdown */}
            <div className="relative shapes-panel">
              <button
                onClick={() => {
                  if (selectedTool.includes("shape")) {
                    // If already on a shape tool, toggle the dialog
                    setShowShapes(!showShapes);
                  } else {
                    // Otherwise, select shapes mode and open dialog
                    selectTool("shapes");
                  }
                }}
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
                        onClick={() => selectTool("shape-rectangle")}
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
                        onClick={() => selectTool("shape-rounded-rect")}
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
                        onClick={() => selectTool("shape-circle")}
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
                        onClick={() => selectTool("shape-star")}
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
                        onClick={() => selectTool("shape-triangle")}
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
                        onClick={() => selectTool("shape-speech-bubble")}
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
                        onClick={() => selectTool("shape-arrow")}
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

              {/* Pen Options Dialog */}
              {showPenOptions && (
                <div className="pen-options-panel absolute top-0 left-full ml-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Pen Tool</h3>
                    <p className="text-xs text-gray-500">Use the color and thickness tools to customize your pen.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Text Tool */}
            <button
              onClick={() => selectTool("text")}
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
              onClick={() => selectTool("mindmap")}
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
              onClick={() => selectTool("image")}
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
              onClick={() => selectTool("comment")}
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
              onClick={() => selectTool("connection")}
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
            className={`flex-1 relative ${selectedTool === 'pen' ? 'pen-tool-cursor' : ''}`}
            style={{
              cursor: selectedTool === 'pen' ? 'crosshair' : 
                      selectedTool === 'eraser' ? 'crosshair' :
                      selectedTool.startsWith('shape-') ? 'crosshair' :
                      isMiddleMousePressed ? 'grabbing' : 'auto'
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
              if (e.button === 0 && (selectedTool === 'pen' || selectedTool === 'eraser' || selectedTool.startsWith('shape-')) && !isMiddleMousePressed) {
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
              
              if (!isMiddleMousePressed && (
                (selectedTool === 'pen' && isDrawing) || 
                (selectedTool === 'eraser') || 
                (selectedTool.startsWith('shape-') && isCreatingShape)
              )) {
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
              
              if (selectedTool === 'pen' || selectedTool === 'eraser' || selectedTool.startsWith('shape-')) {
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
              setCurrentPos(null);
              setScreenStartPos(null);
              setScreenCurrentPos(null);
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
              className={`bg-white ${selectedTool === 'pen' ? 'pen-tool-cursor' : ''}`}
              style={{ 
                cursor: selectedTool === 'pen' ? 'crosshair' : 
                        selectedTool.startsWith('shape-') ? 'crosshair' :
                        isMiddleMousePressed ? 'grabbing' : 'default'
              }}
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
                      stroke={globalColor}
                      strokeWidth={globalThickness}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  
                  {/* Eraser cursor - show when eraser tool is selected */}
                  {selectedTool === 'eraser' && currentPos && (
                    <circle
                      cx={currentPos.x}
                      cy={currentPos.y}
                      r={(globalThickness * 3) / viewport.zoom}
                      fill="rgba(255, 0, 0, 0.1)"
                      stroke="red"
                      strokeWidth={1 / viewport.zoom}
                      strokeDasharray={`${5 / viewport.zoom} ${3 / viewport.zoom}`}
                      pointerEvents="none"
                    />
                  )}
                </g>
              </svg>
            </div>


            
            {/* Shape Preview Overlay - Always visible when creating shapes */}
            {isCreatingShape && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 15 }}
              >
                <svg className="w-full h-full">
                  {/* Shape Preview */}
                  {screenStartPos && screenCurrentPos && (() => {
                    const width = Math.abs(screenCurrentPos.x - screenStartPos.x);
                    const height = Math.abs(screenCurrentPos.y - screenStartPos.y);
                    const left = Math.min(screenStartPos.x, screenCurrentPos.x);
                    const top = Math.min(screenStartPos.y, screenCurrentPos.y);
                    const centerX = (screenStartPos.x + screenCurrentPos.x) / 2;
                    const centerY = (screenStartPos.y + screenCurrentPos.y) / 2;
                    
                    if (width < 10 || height < 10) return null;
                    
                    if (selectedTool === 'shape-rectangle') {
                      return (
                        <rect
                          x={left}
                          y={top}
                          width={width}
                          height={height}
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="rgba(59, 130, 246, 0.1)"
                          strokeDasharray="8,4"
                        />
                      );
                    }
                    
                    if (selectedTool === 'shape-rounded-rect') {
                      const cornerRadius = Math.min(width, height) * 0.1;
                      return (
                        <rect
                          x={left}
                          y={top}
                          width={width}
                          height={height}
                          rx={cornerRadius}
                          ry={cornerRadius}
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="rgba(59, 130, 246, 0.1)"
                          strokeDasharray="8,4"
                        />
                      );
                    }
                    
                    if (selectedTool === 'shape-circle') {
                      return (
                        <ellipse
                          cx={centerX}
                          cy={centerY}
                          rx={width / 2}
                          ry={height / 2}
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="rgba(59, 130, 246, 0.1)"
                          strokeDasharray="8,4"
                        />
                      );
                    }
                    
                    if (selectedTool === 'shape-triangle') {
                      return (
                        <polygon
                          points={`${centerX},${top} ${left},${top + height} ${left + width},${top + height}`}
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="rgba(59, 130, 246, 0.1)"
                          strokeDasharray="8,4"
                        />
                      );
                    }
                    
                    if (selectedTool === 'shape-speech-bubble') {
                      const bubbleWidth = width;
                      const bubbleHeight = height * 0.75;
                      const tailWidth = width * 0.15;
                      const tailHeight = height * 0.25;
                      
                      return (
                        <g>
                          {/* Main bubble */}
                          <rect
                            x={left}
                            y={top}
                            width={bubbleWidth}
                            height={bubbleHeight}
                            rx={Math.min(bubbleWidth, bubbleHeight) * 0.1}
                            ry={Math.min(bubbleWidth, bubbleHeight) * 0.1}
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="rgba(59, 130, 246, 0.1)"
                            strokeDasharray="8,4"
                          />
                          {/* Tail pointer */}
                          <polygon
                            points={`${left + tailWidth},${top + bubbleHeight} ${left + tailWidth * 2},${top + bubbleHeight + tailHeight} ${left + tailWidth * 3},${top + bubbleHeight}`}
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="rgba(59, 130, 246, 0.1)"
                            strokeDasharray="8,4"
                          />
                        </g>
                      );
                    }
                    
                    if (selectedTool === 'shape-arrow') {
                      // Calculate arrow angle for proper arrowhead orientation
                      const dx = screenCurrentPos.x - screenStartPos.x;
                      const dy = screenCurrentPos.y - screenStartPos.y;
                      const angle = Math.atan2(dy, dx);
                      const arrowheadSize = 12;
                      
                      return (
                        <g>
                          <line
                            x1={screenStartPos.x}
                            y1={screenStartPos.y}
                            x2={screenCurrentPos.x}
                            y2={screenCurrentPos.y}
                            stroke="#3b82f6"
                            strokeWidth={4}
                            strokeDasharray="8,4"
                          />
                          <polygon
                            points={`${screenCurrentPos.x},${screenCurrentPos.y} ${screenCurrentPos.x - arrowheadSize * Math.cos(angle - Math.PI / 6)},${screenCurrentPos.y - arrowheadSize * Math.sin(angle - Math.PI / 6)} ${screenCurrentPos.x - arrowheadSize * Math.cos(angle + Math.PI / 6)},${screenCurrentPos.y - arrowheadSize * Math.sin(angle + Math.PI / 6)}`}
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="#3b82f6"
                          />
                        </g>
                      );
                    }
                    
                    if (selectedTool === 'shape-star') {
                      // Create star path with 5 points
                      const centerX = (screenStartPos.x + screenCurrentPos.x) / 2;
                      const centerY = (screenStartPos.y + screenCurrentPos.y) / 2;
                      const outerRadius = Math.min(width, height) / 2;
                      const innerRadius = outerRadius * 0.4;
                      
                      let points = '';
                      for (let i = 0; i < 10; i++) {
                        const angle = (i * Math.PI) / 5 - Math.PI / 2;
                        const radius = i % 2 === 0 ? outerRadius : innerRadius;
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);
                        points += `${x},${y} `;
                      }
                      
                      return (
                        <polygon
                          points={points.trim()}
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="rgba(59, 130, 246, 0.1)"
                          strokeDasharray="8,4"
                        />
                      );
                    }
                    
                    return null;
                  })()}
                </svg>
              </div>
            )}

            {/* Tool Instructions */}
            {(selectedTool !== "select" || isMiddleMousePressed) && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm z-10 shadow-lg">
                {isMiddleMousePressed && "Middle mouse pressed - Pan mode active"}
                {!isMiddleMousePressed && selectedTool === "mindmap" && "Enter text below, then click on canvas to add mind map node"}
                {!isMiddleMousePressed && selectedTool === "text" && "Click on canvas to add text (T)"}
                {!isMiddleMousePressed && selectedTool === "pen" && "Click and drag to draw freely (P) | Middle mouse to pan"}
                {!isMiddleMousePressed && selectedTool === "eraser" && `Click and drag to erase drawings and nodes (${globalThickness * 3}px radius) (E)`}
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
                  const nodeCount = nodes.length;
                  const pathCount = drawingPaths.length;
                  setDrawingPaths([]);
                  setNodes([]);
                  setEdges([]);
                  setSaveStatus("unsaved");
                  if (nodeCount > 0 || pathCount > 0) {
                    showToast("Canvas cleared successfully!", "info");
                  }
                }}
                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear Canvas (Ctrl+Delete)"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  const pathCount = drawingPaths.length;
                  setDrawingPaths([]);
                  setSaveStatus("unsaved");
                  if (pathCount > 0) {
                    showToast("Drawings cleared successfully!", "info");
                  }
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
