# The Bookie Frontend

## Overview
The frontend of The Bookie is built with React.js, providing a modern and responsive user interface for the online bookstore application.

## Project Structure
```
src/
├── components/          # Reusable React components
│   ├── bestSellers.js  # Best selling books component
│   └── ...
├── services/           # API and utility services
│   ├── apiService.js   # Centralized API communication
│   └── ...
├── assets/            # Static assets (images, icons)
└── App.js            # Main application component
```

## Key Features
- Modern, responsive UI
- Book browsing and searching
- Shopping cart functionality
- User authentication
- Admin dashboard

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository
2. Navigate to frontend directory:
```bash
cd bookie-frontend
```
3. Install dependencies:
```bash
npm install
```
4. Start development server:
```bash
npm start
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3001](http://localhost:3001)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Component Documentation

### App.js
Main application component that handles:
- Routing
- Global state management
- Authentication state
- Theme provider

### bestSellers.js
Component for displaying best-selling books:
- Fetches data from backend API
- Implements pagination
- Handles loading and error states

### apiService.js
Centralized service for API communication:
- Implements axios for HTTP requests
- Handles authentication headers
- Provides error handling

## State Management
- React Context for global state
- Local state with useState for component-specific data
- Custom hooks for reusable state logic

## Styling
- CSS Modules for component-specific styles
- Global styles in App.css
- Responsive design principles

## Best Practices
1. Use functional components with hooks
2. Implement proper error handling
3. Follow consistent naming conventions
4. Write reusable components
5. Maintain proper component hierarchy

## Additional Resources

For more information about Create React App:
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

## Troubleshooting

### Common Issues
1. API Connection Issues
   - Verify backend server is running
   - Check API endpoint configuration
   - Validate authentication tokens

2. Build Problems
   - Clear npm cache
   - Delete node_modules and reinstall
   - Check for conflicting dependencies

For additional Create React App documentation sections, see:
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Build Fails to Minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
