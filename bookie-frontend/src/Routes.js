import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App';
import AddBook from './add-book/page';
import Auth from './auth/auth';
import RequireNewBook from './requests/request';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-book" element={<AddBook />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/request-book" element={<RequireNewBook />} />
    
  </Routes>
);

export default AppRoutes;
