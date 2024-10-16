import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography, Button, Menu, Modal, AppBar, IconButton } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem'; // Importar MenuItem

const drawerWidth = 240;

const EmployeeDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Control del menú
  const [openModal, setOpenModal] = useState(false); // Control del modal
  const [userEmail, setUserEmail] = useState(''); // Almacenar el correo del usuario

  useEffect(() => {
    // Obtener datos del usuario desde la API o almacenamiento local
    const fetchUserData = async () => {
      try {
        const userId = '2'; // Reemplaza esto con el ID o token del usuario
        const response = await axios.get(`https://your-api-endpoint/users/${userId}`);
        setUserEmail(response.data.email); // Establecer el correo del usuario
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
    // Manejar la lógica de cierre de sesión aquí
    handleModalClose();
  };

  const handleUpdateProfile = () => {
    // Manejar la lógica de actualización de perfil aquí
    handleModalClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: '100%', // Ancho completo
          backgroundColor: '#000000', // Color de fondo de la Navbar
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1201, // Asegurar que AppBar esté por encima del Drawer
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard Empleado
          </Typography>
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <IconButton color="inherit" onClick={handleMenuOpen}>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          marginTop: '64px', // Empujar Drawer debajo de AppBar
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
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
          bgcolor: 'background.default', 
          mt: '64px', // Margen superior para tener en cuenta la altura de AppBar
        }}
      >
        <Typography variant="h4" gutterBottom>
          {/* Contenido va aquí */}
        </Typography>
        <Outlet />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>{userEmail}</MenuItem> {/* Mostrar el correo del usuario */}
        <MenuItem button component={Link} to="/" onClick={handleLogout}>Cerrar Sesión</MenuItem>
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
            Opciones de Perfil
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Email: {userEmail} {/* Mostrar el correo en el modal */}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
            Actualizar Perfil
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mt: 2, ml: 2 }}>
            Cerrar Sesión
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeDashboard;
