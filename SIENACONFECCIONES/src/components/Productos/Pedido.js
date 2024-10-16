import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import EmptyCartModal from '../Productos/EmpyCartModal';
import QuantityModal from '../inicio/QuantityModal';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';

const Pedido = () => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [pedidoExitoso, setPedidoExitoso] = useState(false);
  const [emptyCartModalOpen, setEmptyCartModalOpen] = useState(false);
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [metodoPago, setMetodoPago] = useState('');
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();

  const validarTelefono = (numero) => {
    const regex = /^3\d{9}$/;
    return regex.test(numero);
  };

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setEmptyCartModalOpen(true);
      return;
    }

    if (!nombre || !direccion || !telefono || !correo || !metodoPago) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!validarTelefono(telefono)) {
      setError('El número de teléfono debe comenzar con 3 y tener 10 dígitos.');
      return;
    }

    if (!validarCorreo(correo)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    setError('');

    const newOrder = {
      nombre,
      direccion,
      telefono,
      correo,
      metodoPago,
      cart,
      total: calcularTotal(),
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        await fetch('http://localhost:5000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            direccion,
            telefono,
            correo,
            metodoPago,
            cart,
            total: calcularTotal(),
          }),
        });

        setPedidoExitoso(true);
        resetForm();
        clearCart();
      } else {
        setError('Error al realizar el pedido. Intente de nuevo.');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error al conectar con la API. Intente de nuevo.');
    }
  };

  const calcularTotal = () => {
    return cart.reduce((total, product) => total + (Number(product.price) * (product.quantity || 1)), 0);
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formato con ceros finales
  };

  const handleQuantityChange = (product, quantity) => {
    updateQuantity(product.id, quantity);
  };

  const handleRemoveProduct = (id) => {
    removeFromCart(id);
  };

  const resetForm = () => {
    setNombre('');
    setDireccion('');
    setTelefono('');
    setCorreo('');
    setMetodoPago('');
  };

  return (
    <Box sx={{ padding: 2, fontFamily: 'Arial, sans-serif', marginTop: '100px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '45%' }}>
          <Typography variant="h4" gutterBottom>Información de Envío</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              margin="normal"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              margin="normal"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              margin="normal"
              value={telefono}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                  setTelefono(value);
                }
              }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              margin="normal"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Método de Pago</InputLabel>
              <Select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <MenuItem value="">Selecciona un método de pago</MenuItem>
                <MenuItem value="contraentrega">Pago contra entrega</MenuItem>
                {/* Puedes agregar más opciones aquí */}
              </Select>
            </FormControl>
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '100%', marginTop: 2, bgcolor: 'black' }}
            >
              Realizar Pedido
            </Button>
          </form>
        </Box>

        <Box sx={{ width: '45%' }}>
          <Typography variant="h4" gutterBottom>Resumen del Pedido</Typography>
          <Box>
            {cart.length > 0 ? (
              cart.map((product) => (
                <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>
                    {product.name} × {product.quantity}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={() => { setSelectedProduct(product); setQuantityModalOpen(true); }} sx={{ margin: '0 5px' }}>
                      <AddIcon />
                    </Button>
                    <Button onClick={() => handleRemoveProduct(product.id)} sx={{ margin: '0 5px' }}>
                      <DeleteIcon />
                    </Button>
                    <Typography>${formatPrice(Number(product.price) * (product.quantity || 1))}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>Tu carrito está vacío</Typography>
            )}
            <hr />
            <Typography variant="h6">
              Total: <span style={{ float: 'right' }}>${formatPrice(calcularTotal())}</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar open={pedidoExitoso} autoHideDuration={6000} onClose={() => setPedidoExitoso(false)}>
        <Alert onClose={() => setPedidoExitoso(false)} severity="success">
          ¡Pedido Exitoso! Tu pedido ha sido registrado correctamente.
        </Alert>
      </Snackbar>

      <EmptyCartModal open={emptyCartModalOpen} onClose={() => setEmptyCartModalOpen(false)} />
      <QuantityModal
        open={quantityModalOpen}
        onClose={() => setQuantityModalOpen(false)}
        onConfirm={handleQuantityChange}
        product={selectedProduct}
      />
    </Box>
  );
};

export default Pedido;
