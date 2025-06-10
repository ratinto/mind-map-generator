# Mind Map Generator

A modern, interactive web application for creating, saving, and managing mind maps. Built with React and ReactFlow.

![Mind Map Generator Screenshot](https://via.placeholder.com/800x400?text=Mind+Map+Generator)

## Features

- **Interactive Mind Maps**: Create nodes and connections with an intuitive interface
- **Modern Dashboard**: View, search, and manage all your saved mind maps
- **Local Storage**: All mind maps are saved to your browser's local storage
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React** - Frontend UI library
- **ReactFlow** - Interactive node-based UI library
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/mind-map-generator.git
   cd mind-map-generator
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. **Create a Mind Map**:
   - Click "Create New Mind Map" from the dashboard
   - Enter text and click "Add Node" to create nodes
   - Drag from one node to another to create connections
   - Name your mind map and click "Save Mind Map"

2. **Edit Existing Mind Maps**:
   - Click "Open" on any mind map from the dashboard
   - Make your changes and save again

3. **Delete Mind Maps**:
   - Click the delete icon on any mind map card
   - Confirm deletion in the popup dialog

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx     # Mind map listing and management
│   └── MindMapEditor.jsx # Interactive mind map editor
├── App.jsx               # Main application component
├── App.css               # Global styles
└── main.jsx              # Application entry point
```

## License

MIT

## Acknowledgments

- [ReactFlow](https://reactflow.dev/) for the interactive node-based UI
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast development experience
