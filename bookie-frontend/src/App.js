import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import Home from './components/home';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminPage from './admin/page';
import AdminManagement from './admin/AdminManagement';
import AddBook from './add-book/page';
import BookDetails from './components/book/bookDetails';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="preview/:id" element={<BookDetails />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/manage"
            element={
              <ProtectedRoute adminOnly>
                <AdminManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-book"
            element={
              <ProtectedRoute adminOnly>
                <AddBook />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
