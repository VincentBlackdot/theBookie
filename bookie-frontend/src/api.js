import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

export const getBooks = () => axios.get(API_URL);
export const createBook = (book) => axios.post(API_URL, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);