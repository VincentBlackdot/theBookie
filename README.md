# theBookie
This "Book Library" app has NestJS backend to handle the API and a React frontend to display and manage the book data. 
We'll focus on creating a clean user interface and a robust backend to handle CRUD operations seamlessly.

Frontend (bookie-frontend)
File: bookie-frontend/README.md

markdown
Copy code
# Bookie Frontend

The frontend for the Bookie application, built with React. This app allows users to add, view, edit, and delete books through a user-friendly interface.

## Features

- Add new books to the list
- Edit existing book details
- Delete books
- View a list of all books with book information displayed in a clean UI

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookie-frontend.git
   cd bookie-frontend
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Running the Application
Start the development server:

bash
Copy code
npm start
# or
yarn start
The app will be accessible at http://localhost:3000.

Note: Ensure that the backend server is running at http://localhost:3001 or update the API base URL in the api.js file to match the backend's actual URL.

File Structure
src/components/: Contains the main components for the app, including BookForm and BookList.
src/api.js: Handles API requests to the backend server.
public/: Static assets for the frontend.
API Integration
The frontend connects to the backend API to fetch, create, update, and delete books. Make sure the backend server is configured and running properly for full functionality.

Styling
Custom styles for the application are located in the src/components/ directory. You can modify these files to adjust the appearance of the application.

License
This project is licensed under the MIT License. See the LICENSE file for details.

yaml
Copy code

---

### Backend (`bookie-backend`)

**File**: `bookie-backend/README.md`

```markdown
# Bookie Backend

The backend API for the Bookie application, built with Express.js. This API allows CRUD operations on a book database stored in Azure SQL.

## Features

- Create, read, update, and delete book records
- Connects to an Azure SQL Database for persistent storage
- Configured with CORS support for frontend integration

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An Azure SQL Database with configured connection details

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookie-backend.git
   cd bookie-backend
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Set up environment variables:

Create a .env file in the root directory with the following details:

plaintext
Copy code
DB_SERVER=your-azure-sql-server-name.database.windows.net
DB_DATABASE=your-database-name
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_ENCRYPT=true
PORT=3001
Replace your-azure-sql-server-name, your-database-name, your-database-username, and your-database-password with your Azure SQL Database details.

Running the Application
Start the server:

bash
Copy code
npm start
# or
yarn start
The backend server will run at http://localhost:3001.

API Endpoints
Endpoint	Method	Description
/books	GET	Get all books
/books/:id	GET	Get a book by ID
/books	POST	Add a new book
/books/:id	PUT	Update an existing book
/books/:id	DELETE	Delete a book by ID
CORS Configuration
To allow the frontend to connect, CORS is enabled. You can customize the allowed origins in the app.js file if needed.

Database
This backend connects to an Azure SQL Database. Ensure your Azure SQL instance is properly configured to accept connections and that firewall settings allow access.

License
This project is licensed under the MIT License. See the LICENSE file for details.

yaml
Copy code

---

These README files offer clear setup instructions, configuration details, and usage information for both the frontend and backend of your Bookie application. Let me know if there’s anything more specific you’d like to include!
