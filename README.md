# The Bookie - Online Bookstore Application

## Project Overview
The Blackdot Bookie is a modern online booklibrary application built with React.js for the frontend and Node.js/Express.js for the backend. It provides a seamless experience for users to browse, search, and download books online.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VincentBlackdot/theBookie.git
cd theBookie
```

2. Setup Backend:
```bash
cd bookie-backend
npm install
npm run start:dev
```

3. Setup Frontend:
```bash
cd bookie-frontend
npm install
npm start
```

The application will be available at `http://localhost:3001`, and the backend API will run on `http://localhost:3000`.

## Project Structure

```
theBookie/
├── bookie-frontend/     # React frontend application
├── bookie-backend/      # Node.js/Express backend API
```

## Default Admin Credentials
- Email: admin@thebookie.com
- Password: admin123

## Documentation
- [Frontend Documentation](./bookie-frontend/README.md)
- [Backend Documentation](./bookie-backend/README.md)
- API Documentation: Available at `http://localhost:3000/api` (Swagger UI)

## API Documentation
The project uses Swagger UI for interactive API documentation. Once the backend server is running, you can:
1. Visit `http://localhost:3000/api` in your browser
2. Explore and test all available API endpoints
3. View request/response schemas
4. Try out the API with authentication

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
