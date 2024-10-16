import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box, Menu, MenuItem, Badge, TextField, Autocomplete } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthModal from '../inicio/AuthModal'; 
import CartModal from '../inicio/CartModal'; 
import ProfileModal from '../inicio/ProfileModal '; 
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';

const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartOpen, toggleCart, cart } = useCart();
  const { auth, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);
  
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  
  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };
  
  const handleSearchChange = (event, value) => {
    setSearchTerm(value);
  };
  
  const handleSearchSelect = (product) => {
    if (product) {
      navigate(`/products/${product.id}`);
      setSearchTerm('');
    }
  };

  return (
    <>
      <AppBar position="absolute" sx={{ bgcolor: 'black', padding: '10px 0' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', marginLeft: 2 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Siena Caps</Link>
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/" sx={{ margin: 1 }}>Inicio</Button>
            <Button color="inherit" component={Link} to="/gorras" sx={{ margin: 1 }}>Gorras</Button>
            <Button color="inherit" component={Link} to="/personalizacion" sx={{ margin: 1 }}>Personalización</Button>
            <Button color="inherit" component={Link} to="/acerca" sx={{ margin: 1 }}>Acerca</Button>

            {auth && auth.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin/inicioadmin" sx={{ margin: 1 }}>
                Administrador
              </Button>
            )}
            {auth && auth.role === 'employee' && (  // Opción para el empleado
              <Button color="inherit" component={Link} to="/employee/products" sx={{ margin: 1 }}>
                Empleado
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <Autocomplete
              freeSolo
              options={products.map(product => product.name)} 
              onInputChange={handleSearchChange}
              onChange={(event, newValue) => handleSearchSelect(products.find(product => product.name === newValue))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="Buscar productos"
                  sx={{ bgcolor: 'white' }}
                />
              )}
              sx={{ width: 300, marginRight: 2 }}
            />
            
            {auth ? (
              <>
                <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                  <PersonIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={() => { handleProfileMenuClose(); setProfileOpen(true); }}>Modificar</MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={handleAuthOpen} sx={{ margin: 0 }}>
                <PersonIcon />
              </Button>
            )}

            <IconButton color="inherit" onClick={toggleCart}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Container>
      </AppBar>
      <AuthModal open={authOpen} onClose={handleAuthClose} />
      <CartModal open={cartOpen} onClose={toggleCart} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default Navbar;
