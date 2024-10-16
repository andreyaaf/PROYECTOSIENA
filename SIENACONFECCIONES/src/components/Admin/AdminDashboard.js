import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography, IconButton, Menu, MenuItem, Modal, Button, AppBar } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    handleModalClose();
  };

  const handleUpdateProfile = () => {
    handleModalClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: '#333', // Color de fondo de la AppBar
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Ventana del Admin 
          </Typography>
          <Button component={Link} to="/" color="inherit">Inicio</Button>
          
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          marginTop: '64px',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4', // Color de fondo de la barra lateral
            borderRight: '1px solid #ccc', // Borde derecho
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="inicioadmin">
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button component={Link} to="users">
              <ListItemText primary="Usuarios" />
            </ListItem>
            <ListItem button component={Link} to="products">
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem button component={Link} to="orders">
              <ListItemText primary="Pedidos" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          bgcolor: '#eaeff1', // Color de fondo del área principal
          mt: '64px', 
          p: 3, // Padding en el área principal
        }}
      >
        <Outlet />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleModalOpen}>Profile</MenuItem>
        <MenuItem button component={Link} to="/">Cerrar Sesion</MenuItem>
      </Menu>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Profile Options
          </Typography>
          <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
            Update Profile
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mt: 2, ml: 2 }}>
            Logout
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
