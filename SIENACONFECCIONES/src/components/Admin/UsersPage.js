import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, InputLabel, Select, MenuItem, TextField, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [action, setAction] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpen = (user = null) => {
    setEditUser(user);
    setName(user ? user.name : '');
    setEmail(user ? user.email : '');
    setRole(user ? user.role : '');
    setAction(user ? 'edit' : 'add');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setEmail('');
    setRole('');
  };

  const handleSave = async () => {
    try {
      if (action === 'add') {
        await axios.post('http://localhost:5000/users', { name, email, role });
      } else if (action === 'edit') {
        const { password } = editUser; // Preserve the existing password
        await axios.put(`http://localhost:5000/users/${editUser.id}`, { name, email, role, password });
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Usuarios
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} startIcon={<AddIcon />}>
        Añadir Usuario
      </Button>
      <TextField 
        label="Buscar por nombre o correo" 
        variant="outlined" 
        fullWidth 
        sx={{ mt: 2 }} 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(user)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {action === 'add' ? 'Añadir Usuario' : 'Modificar Usuario'}
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Rol"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
              {action === 'add' ? 'Añadir' : 'Guardar'}
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
