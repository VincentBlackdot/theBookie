# The Bookie Backend

## Overview
The Bookie backend is built with NestJS, a progressive Node.js framework, providing a robust API for the online bookstore application.

## Project Structure
```
src/
├── controllers/     # Route controllers
├── services/       # Business logic
├── models/         # Data models
├── middleware/     # Custom middleware
├── guards/         # Authentication guards
└── config/         # Configuration files
```

## Key Features
- RESTful API endpoints
- User authentication and authorization
- Book management
- Order processing
- File upload handling
- SQLite database integration

## API Documentation

The API documentation is available in two formats:

### Swagger UI
- Interactive API documentation is available at `http://localhost:3000/api`
- Allows you to:
  - View all available endpoints
  - Test API endpoints directly from the browser
  - See request/response schemas
  - Try out authentication
  - Download OpenAPI specification

To access Swagger UI:
1. Start the backend server
2. Navigate to `http://localhost:3000/api` in your browser
3. You can test endpoints directly and see detailed request/response schemas

### API Endpoints Overview

## API Endpoints

### Authentication
- POST `/auth/login` - User login
- POST `/auth/register` - User registration
- POST `/auth/refresh` - Refresh token

### Books
- GET `/books` - List all books
- GET `/books/:id` - Get book details
- POST `/books` - Add new book (Admin)
- PUT `/books/:id` - Update book (Admin)
- DELETE `/books/:id` - Delete book (Admin)

### Users
- GET `/users/profile` - Get user profile
- PUT `/users/profile` - Update user profile
- GET `/users` - List all users (Admin)

### Orders
- POST `/orders` - Create order
- GET `/orders` - List user orders
- GET `/orders/:id` - Get order details

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- SQLite

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# .env file

MONGO_URI=mongodb+srv://user-emailorId:xxxxxxx@cluster0.xxxxxx.mongodb.net/myDatabaseName
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=xxxxxxxxxxx
S3_BUCKET_NAME=xxxxxxxxxxxxxxxxxxxxxxxxx 
```

4. Start the development server:
```bash
npm run start:dev
```

## Available Scripts

```bash
# development
npm run start

# watch mode
npm run start:dev

# production build
npm run build

# production mode
npm run start:prod

# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Database Schema

### Books Table
```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL,
  description TEXT,
  image_url TEXT
);
```

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Authentication
- JWT-based authentication
- Role-based access control (User/Admin)
- Token refresh mechanism

## Error Handling
- Global exception filter
- Custom error responses
- Request validation

## Best Practices
1. Follow NestJS architectural patterns
2. Implement proper error handling
3. Use dependency injection
4. Write unit and e2e tests
5. Follow REST API conventions

## Deployment
For production deployment:
1. Build the application:
```bash
npm run build
```
2. Set production environment variables
3. Start the production server:
```bash
npm run start:prod
```

## Additional Resources
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

## Support
For support and questions:
- Project Issues: Create a GitHub issue
- NestJS Support: [Discord channel](https://discord.gg/G7Qnnhy)
