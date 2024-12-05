import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

const apiService = {
  // Books
  getBooks: () => axios.get(API_URL),
  getBookById: (id) => axios.get(`${API_URL}/${id}`),
  createBook: (bookData) => axios.post(API_URL, bookData),
  updateBook: (id, book) => axios.put(`${API_URL}/${id}`, book),
  deleteBook: (id) => axios.delete(`${API_URL}/${id}`),
  incrementDownloads: (id) => axios.put(`${API_URL}/${id}/downloads`),
};

export default apiService;
