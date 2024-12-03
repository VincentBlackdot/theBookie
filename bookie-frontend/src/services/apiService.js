import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

export const getBooks = () => axios.get(API_URL);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`); 
export const createBook = (bookData) => axios.post(API_URL, bookData);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
export const incrementDownloads = (id) => axios.put(`${API_URL}/${id}/increment/downloads`);

export default { getBooks, getBookById, createBook, updateBook, deleteBook, incrementDownloads };
