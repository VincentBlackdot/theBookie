import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/admins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(response.data);
    } catch (error) {
      showMessage('Error fetching admins', 'error');
    }
  };

  const handleAddAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/auth/register-admin',
        newAdmin,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenDialog(false);
      setNewAdmin({ email: '', password: '' });
      showMessage('Admin added successfully', 'success');
      fetchAdmins();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Error adding admin', 'error');
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/auth/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('Admin removed successfully', 'success');
      fetchAdmins();
    } catch (error) {
      showMessage('Error removing admin', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Management
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{ mb: 2 }}
        >
          Add New Admin
        </Button>

        <List>
          {admins.map((admin) => (
            <ListItem key={admin._id} divider>
              <ListItemText primary={admin.email} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteAdmin(admin._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAdmin} variant="contained">
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminManagement;
