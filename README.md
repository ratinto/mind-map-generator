# Mind Map Generator 🧠✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern, interactive web application for creating, editing, and managing mind maps. Built with React, ReactFlow, and Django, featuring real-time collaboration, intelligent auto-save, and advanced drawing tools.

## 🏗️ Repository Structure

This project consists of two separate repositories:

- **Frontend (This repo)**: [mind-map-generator](https://github.com/ratinto/mind-map-generator) - React application with UI and drawing tools
- **Backend**: [mind-map-generator-backend](https://github.com/ratinto/mind-map-generator-backend) - Django REST API for data management

![Mind Map Generator Demo](https://via.placeholder.com/900x500?text=Mind+Map+Generator+Demo+Screenshot)

## 🌟 Features

### Core Functionality
- **Interactive Mind Maps**: Create nodes and connections with an intuitive drag-and-drop interface
- **Advanced Drawing Tools**: Pen tool, eraser, and various shape tools (rectangles, circles, triangles, stars, arrows, speech bubbles)
- **Shape Transformation**: Select and resize shapes with interactive transformation handles
- **Intelligent Auto-Save**: Activity-based auto-save that saves 3 seconds after you stop editing
- **Real-time Notifications**: Toast notifications for save status and system feedback

### User Experience
- **Modern Dashboard**: View, search, and manage all your saved mind maps
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile
- **Dark/Light Theme Support**: (Coming soon)
- **Keyboard Shortcuts**: Efficient workflow with keyboard shortcuts

### Technical Features
- **User Authentication**: Secure login and registration system
- **Cloud Storage**: Mind maps are saved to a Django backend with SQLite database
- **Export Options**: Export mind maps as images or JSON (Coming soon)
- **Collaboration**: Real-time collaborative editing (Coming soon)

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **ReactFlow 11** - Interactive node-based editor
- **React Router** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **Vite** - Next-generation frontend build tool

### Backend
- **Django 5.2** - Python web framework
- **Django REST Framework** - API development
- **SQLite** - Development database
- **Django CORS Headers** - Cross-origin resource sharing
- **Gunicorn** - Production WSGI server

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or later)
- **Python** (v3.9 or later)
- **npm** or **yarn**
- **pip** (Python package manager)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ratinto/mind-map-generator.git
cd mind-map-generator
```

> **Note**: This repository contains the frontend (React) code. You'll also need the backend server from: [mind-map-generator-backend](https://github.com/ratinto/mind-map-generator-backend)

#### 2. Backend Setup (Django)
```bash
# Clone the backend repository
git clone https://github.com/ratinto/mind-map-generator-backend.git
cd mind-map-generator-backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

#### 3. Frontend Setup (React)
```bash
# Open new terminal and navigate to frontend directory
cd mind-map-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin

## 📁 Project Structure

```
mind-map-generator/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Mind map listing and management
│   │   ├── MindMapEditor.jsx      # Interactive mind map editor with drawing tools
│   │   ├── Home.jsx               # Landing page
│   │   ├── Login.jsx              # User authentication
│   │   ├── Signup.jsx             # User registration
│   │   ├── Navbar.jsx             # Navigation component
│   │   └── ProtectedRoute.jsx     # Route protection
│   ├── contexts/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── services/
│   │   └── apiService.js          # API communication
│   ├── assets/                    # Static assets
│   ├── App.jsx                    # Main application component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
├── public/                        # Public assets
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js                # Vite configuration
└── README.md

mind-map-generator-backend/
├── api/                          # Django app for API
│   ├── models.py                 # Database models
│   ├── views.py                  # API views
│   ├── serializers.py            # Data serializers
│   └── urls.py                   # API routes
├── backend/                      # Django project settings
│   ├── settings.py               # Django configuration
│   ├── urls.py                   # Main URL configuration
│   └── wsgi.py                   # WSGI configuration
├── manage.py                     # Django management script
├── requirements.txt              # Python dependencies
└── README.md
```

## 🎯 Usage Guide

### Creating Your First Mind Map
1. **Sign Up/Login**: Create an account or log in to access the dashboard
2. **Create New Mind Map**: Click "Create New Mind Map" from the dashboard
3. **Add Content**: 
   - Use the text tool to add nodes
   - Use the pen tool to draw freehand
   - Add shapes using the shape tools
4. **Connect Ideas**: Drag from one node to another to create connections
5. **Transform Elements**: Select shapes to resize and modify them
6. **Save**: Your work is automatically saved every 3 seconds after you stop editing

### Drawing Tools
- **Select Tool**: Default tool for selecting and moving elements
- **Pen Tool**: Draw freehand paths and annotations
- **Text Tool**: Add text nodes to your mind map
- **Shape Tools**: Add rectangles, circles, triangles, stars, arrows, and speech bubbles
- **Eraser Tool**: Remove drawn paths and elements
- **Color Picker**: Change colors for drawing tools
- **Thickness Control**: Adjust line thickness for drawing tools

## 🤝 Contributing

We welcome contributions from developers of all skill levels! This project is participating in **Hacktoberfest 2025**.

### How to Contribute
1. Read our [Contributing Guidelines](CONTRIBUTING.md)
2. Check out our [open issues](https://github.com/ratinto/mind-map-generator/issues)
3. Fork the repository
4. Create a feature branch
5. Make your changes
6. Submit a pull request

### Good First Issues
Look for issues labeled with:
- `good first issue` - Perfect for beginners
- `help wanted` - We need community help
- `hacktoberfest` - Hacktoberfest specific issues
- `documentation` - Help improve our docs
- `bug` - Fix bugs and improve stability

## 🚧 Roadmap

### Upcoming Features
- [ ] **Export Functionality**: PDF, PNG, and SVG export options
- [ ] **Real-time Collaboration**: Multiple users editing simultaneously
- [ ] **Dark Mode**: Complete dark theme implementation
- [ ] **Mobile App**: React Native mobile application
- [ ] **Advanced Shapes**: More shape types and custom shapes
- [ ] **Keyboard Shortcuts**: Comprehensive keyboard navigation
- [ ] **Version History**: Track and restore previous versions
- [ ] **Templates**: Pre-built mind map templates
- [ ] **Sharing**: Public sharing and embedding options
- [ ] **Integrations**: Import from other mind mapping tools

### Performance Improvements
- [ ] **Database Optimization**: PostgreSQL migration for production
- [ ] **Caching**: Redis integration for better performance
- [ ] **CDN**: Static asset delivery optimization
- [ ] **Progressive Web App**: PWA features for offline usage

## 🧪 Testing

```bash
# Frontend testing
npm run test

# Backend testing
cd mind-map-generator-backend
python manage.py test

# Linting
npm run lint
```

## 📦 Building for Production

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn backend.wsgi:application
```

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) - For the powerful node-based editor
- [TailwindCSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Django](https://www.djangoproject.com/) - For the robust backend framework
- [Vite](https://vitejs.dev/) - For the lightning-fast development experience
- All our amazing [contributors](https://github.com/ratinto/mind-map-generator/graphs/contributors)

## 🌐 Community

- **GitHub Issues**: [Report bugs and request features](https://github.com/ratinto/mind-map-generator/issues)
- **Discussions**: [Join community discussions](https://github.com/ratinto/mind-map-generator/discussions)
- **Hacktoberfest**: [Participate in Hacktoberfest 2025](https://hacktoberfest.com/)

---

<div align="center">
  <p>Made with ❤️ by the open source community</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
