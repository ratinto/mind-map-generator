# Contributing to Mind Map Generator 🤝

Thank you for your interest in contributing to Mind Map Generator! We welcome contributions from developers of all skill levels and backgrounds. This project is participating in **Hacktoberfest 2025**, and we're excited to help you make your first (or next) open source contribution.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Types of Contributions](#types-of-contributions)
- [Submission Guidelines](#submission-guidelines)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Community](#community)

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

### Our Values
- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome newcomers and help them learn
- **Be Collaborative**: Work together to build something amazing
- **Be Patient**: Everyone is learning, including maintainers

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or later)
- **Python** (v3.9 or later)
- **Git** for version control
- A **GitHub account**
- Basic knowledge of **React** and **Django** (depending on what you want to contribute to)

### Repository Structure
This project consists of two separate repositories:
- **Frontend (This repo)**: React application with UI and drawing tools
- **Backend**: [mind-map-generator-backend](https://github.com/ratinto/mind-map-generator-backend) - Django REST API

### First Time Contributors
If you're new to open source, welcome! Here are some great first steps:

1. **Explore the project**: Try out the application locally
2. **Read the documentation**: Understand how the project works
3. **Look for "good first issue" labels**: These are beginner-friendly issues
4. **Join our discussions**: Ask questions and introduce yourself

## 🛠️ Development Setup

### 1. Fork and Clone
```bash
# Fork this repository (frontend) on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/mind-map-generator.git
cd mind-map-generator

# Add the original repository as upstream
git remote add upstream https://github.com/ratinto/mind-map-generator.git

# Also clone the backend repository
git clone https://github.com/ratinto/mind-map-generator-backend.git
```

### 2. Backend Setup (Django)
```bash
cd mind-map-generator-backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start backend server
python manage.py runserver
```

### 3. Frontend Setup (React)
```bash
# In a new terminal
cd mind-map-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Verify Setup
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Test both parts are working correctly

## 🎯 How to Contribute

### Step 1: Find an Issue
- Browse [open issues](https://github.com/ratinto/mind-map-generator/issues)
- Look for labels:
  - `good first issue` - Perfect for beginners
  - `help wanted` - We need community help
  - `hacktoberfest` - Hacktoberfest specific
  - `bug` - Bug fixes
  - `enhancement` - New features
  - `documentation` - Documentation improvements

### Step 2: Claim the Issue
- Comment on the issue saying you'd like to work on it
- Wait for maintainer confirmation before starting
- Ask questions if anything is unclear

### Step 3: Create a Branch
```bash
# Update your fork
git checkout main
git pull upstream main

# Create a new branch for your work
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Step 4: Make Your Changes
- Write clean, readable code
- Follow our style guidelines
- Add tests if applicable
- Update documentation as needed

### Step 5: Test Your Changes
```bash
# Frontend testing
npm run test
npm run lint

# Backend testing
cd mind-map-generator-backend
python manage.py test
```

### Step 6: Commit and Push
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add export to PDF functionality"

# Push to your fork
git push origin feature/your-feature-name
```

### Step 7: Create a Pull Request
- Go to your fork on GitHub
- Click "New Pull Request"
- Fill out the PR template
- Link to the related issue
- Wait for review

## 🔍 Types of Contributions

### 🐛 Bug Fixes
- Fix existing bugs
- Improve error handling
- Enhance edge case coverage

**Example Issues:**
- Mind map not saving properly
- UI elements not responsive on mobile
- Drawing tools not working in certain browsers

### ✨ New Features
- Add new functionality
- Enhance existing features
- Improve user experience

**Example Issues:**
- Export mind maps to PDF/PNG
- Add keyboard shortcuts
- Implement dark mode
- Add more shape types
- Real-time collaboration

### 📚 Documentation
- Improve README
- Add code comments
- Create tutorials
- Write API documentation

**Example Issues:**
- Add setup instructions for different OS
- Create video tutorials
- Improve code documentation
- Write user guides

### 🎨 Design & UI/UX
- Improve visual design
- Enhance user experience
- Make interface more intuitive
- Improve accessibility

**Example Issues:**
- Improve color scheme
- Better mobile responsiveness
- Accessibility improvements
- Icon and animation enhancements

### 🧪 Testing
- Add unit tests
- Add integration tests
- Improve test coverage
- Add end-to-end tests

**Example Issues:**
- Add tests for React components
- Add API endpoint tests
- Test drawing functionality
- Add accessibility tests

### ⚡ Performance
- Optimize loading times
- Improve rendering performance
- Reduce bundle size
- Database optimizations

**Example Issues:**
- Optimize large mind map rendering
- Reduce initial load time
- Improve auto-save performance
- Database query optimization

## 📝 Submission Guidelines

### Pull Request Guidelines

#### PR Title Format
Use conventional commit format:
- `feat: add export to PDF functionality`
- `fix: resolve drawing tool synchronization issue`
- `docs: update installation instructions`
- `style: improve button hover animations`
- `test: add unit tests for shape transformation`
- `refactor: simplify authentication logic`

#### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Related Issue
Fixes #123

## Testing
- [ ] Added tests for new functionality
- [ ] All existing tests pass
- [ ] Manually tested in browser

## Screenshots (if applicable)
Add screenshots to show visual changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have updated documentation as needed
```

### Commit Message Guidelines
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>[optional scope]: <description>

# Examples
feat: add PDF export functionality
fix: resolve shape transformation bug
docs: update API documentation
style: improve button styling
test: add unit tests for drawing tools
refactor: simplify state management
```

## 🎨 Style Guidelines

### Frontend (React/JavaScript)

#### Code Style
- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings
- Use **camelCase** for variables and functions
- Use **PascalCase** for components
- Use **UPPER_CASE** for constants

#### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic
  }, []);

  const handleClick = () => {
    // Event handler logic
  };

  return (
    <div className="my-component">
      {/* JSX content */}
    </div>
  );
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default MyComponent;
```

#### CSS/Tailwind
- Use **Tailwind CSS** classes when possible
- Follow **mobile-first** responsive design
- Use **semantic class names** for custom CSS
- Group related Tailwind classes together

### Backend (Django/Python)

#### Code Style
- Follow **PEP 8** guidelines
- Use **4 spaces** for indentation
- Use **snake_case** for variables and functions
- Use **PascalCase** for classes
- Maximum line length: **88 characters** (Black formatter)

#### Django Patterns
```python
# models.py
from django.db import models

class MindMap(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

class MindMapViewSet(viewsets.ModelViewSet):
    queryset = MindMap.objects.all()
    serializer_class = MindMapSerializer
    
    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        # Custom action logic
        return Response({'status': 'duplicated'})
```

## 🧪 Testing

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Backend Testing
```bash
# Run all tests
python manage.py test

# Run specific test
python manage.py test api.tests.test_models

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### Writing Tests

#### Frontend Tests (React Testing Library)
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Backend Tests (Django)
```python
from django.test import TestCase
from rest_framework.test import APITestCase
from .models import MindMap

class MindMapModelTest(TestCase):
    def setUp(self):
        self.mind_map = MindMap.objects.create(
            title="Test Mind Map"
        )
    
    def test_string_representation(self):
        self.assertEqual(str(self.mind_map), "Test Mind Map")

class MindMapAPITest(APITestCase):
    def test_create_mind_map(self):
        data = {'title': 'New Mind Map'}
        response = self.client.post('/api/mindmaps/', data)
        self.assertEqual(response.status_code, 201)
```

## 🚨 Common Issues and Solutions

### Setup Issues
- **Node modules not installing**: Try deleting `node_modules` and `package-lock.json`, then run `npm install`
- **Python dependencies failing**: Make sure you're using the correct Python version and virtual environment
- **Port already in use**: Kill processes using the ports or use different ports

### Development Issues
- **Changes not reflecting**: Check if you need to restart the development server
- **CORS errors**: Ensure the backend CORS settings include your frontend URL
- **Authentication issues**: Check if you're logged in and tokens are valid

### Git Issues
- **Merge conflicts**: Use `git status` to see conflicted files, resolve conflicts, then `git add` and `git commit`
- **Outdated fork**: Regularly sync with upstream using `git pull upstream main`

## 🏷️ Issue Labels Guide

Understanding our labels helps you find the right issues to work on:

### Difficulty Labels
- `good first issue` - Perfect for newcomers
- `easy` - Requires basic knowledge
- `medium` - Requires some experience
- `hard` - Requires advanced knowledge

### Type Labels
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `question` - Further information is requested
- `help wanted` - Extra attention is needed

### Priority Labels
- `priority: low` - Nice to have
- `priority: medium` - Important
- `priority: high` - Critical

### Component Labels
- `frontend` - React/UI related
- `backend` - Django/API related
- `database` - Database related
- `testing` - Testing related
- `design` - UI/UX related

### Special Labels
- `hacktoberfest` - Hacktoberfest issues
- `duplicate` - Duplicate issue
- `wontfix` - This will not be worked on
- `invalid` - This doesn't seem right

## 🎉 Recognition

We believe in recognizing contributors:

- **Contributors list**: All contributors are listed in our README
- **Release notes**: Significant contributions are mentioned in release notes
- **Hacktoberfest**: Valid PRs count toward Hacktoberfest completion
- **Learning**: We're here to help you learn and grow

## 🤔 Questions?

Don't hesitate to ask questions:

1. **Check existing issues**: Your question might already be answered
2. **Create a discussion**: Use GitHub Discussions for general questions
3. **Create an issue**: For specific bugs or feature requests
4. **Comment on issues**: Ask for clarification on existing issues

## 📞 Contact

- **GitHub Issues**: [Create an issue](https://github.com/ratinto/mind-map-generator/issues/new)
- **GitHub Discussions**: [Join discussions](https://github.com/ratinto/mind-map-generator/discussions)
- **Email**: [Contact maintainers](mailto:your-email@example.com)

---

## 🎊 Thank You!

Thank you for contributing to Mind Map Generator! Your contributions help make this project better for everyone. Whether you're fixing a typo, adding a feature, or helping other contributors, every contribution matters.

Happy coding! 🚀

---

<div align="center">
  <p><strong>Let's build something amazing together!</strong></p>
  <p>⭐ Don't forget to star the repository if you find it helpful!</p>
</div>
