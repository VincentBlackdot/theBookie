# theBookie
This "Book Library" app will have a NestJS backend to handle the API and a React frontend to display and manage the book data. We'll focus on creating a clean user interface and a robust backend to handle CRUD operations seamlessly.

Bookie Application Design
1. Backend (API) - Using NestJS (TypeScript)
Data Model: The data model for a book will consist of three fields:

title: string, required
author: string, required
ISBN: string, optional
Endpoints
GET /books - Fetch all books.
POST /books - Add a new book.
PUT /books/
- Update an existing book by ID.
DELETE /books/
- Delete a book by ID.
