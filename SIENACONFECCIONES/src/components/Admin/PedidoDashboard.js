import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardMedia,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Importar icono
import EditIcon from '@mui/icons-material/Edit'; // Importar icono
import DeleteIcon from '@mui/icons-material/Delete'; // Importar icono

const PedidoDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [editingPedido, setEditingPedido] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('en proceso');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProducts, setExpandedProducts] = useState({});

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/orders/${id}`, { method: 'DELETE' });
      setPedidos(pedidos.filter((pedido) => pedido.id !== id));
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };

  const handleEdit = (pedido) => {
    setEditingPedido(pedido);
    setUpdatedStatus('en proceso');
    setUpdatedAddress(pedido.direccion);
    setOpenEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/orders/${editingPedido.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingPedido,
          status: updatedStatus,
          direccion: updatedAddress,
        }),
      });
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === editingPedido.id
            ? { ...pedido, status: updatedStatus, direccion: updatedAddress }
            : pedido
        )
      );
      setOpenEditModal(false);
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };

  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pedido.id.toString().includes(searchQuery)
  );

  const handleToggleExpand = (pedidoId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [pedidoId]: !prev[pedidoId],
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Pedidos
      </Typography>
      <TextField
        label="Buscar Pedido por ID o Nombre"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filteredPedidos.map((pedido) => (
          <Grid item xs={12} sm={6} md={4} key={pedido.id}>
            <Paper elevation={3} sx={{ mb: 2, borderRadius: 2 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>{`Pedido ID: ${pedido.id}`}</Typography>
                  <Typography variant="subtitle1">{`Total: $${pedido.total.toFixed(2)}`}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {`Nombre: ${pedido.nombre}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {`Fecha: ${new Date(pedido.date).toLocaleDateString()}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {`Estado: ${pedido.status}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {`Dirección: ${pedido.direccion}`}
                  </Typography>

                  {/* Mostrar solo el primer producto */}
                  {pedido.cart.length > 0 && (
                    <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                      <CardMedia
                        component="img"
                        alt={pedido.cart[0].name}
                        height="80"
                        image={pedido.cart[0].imageUrl}
                        sx={{ width: 80, mr: 2, borderRadius: 1 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{pedido.cart[0].name}</Typography>
                        <Typography variant="body2">{`Cantidad: ${pedido.cart[0].quantity}`}</Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Mostrar botón "Ver Más" solo si hay más de un producto */}
                  {pedido.cart.length > 1 && (
                    <>
                      <Button
                        onClick={() => handleToggleExpand(pedido.id)}
                        sx={{ mt: 1, color: 'primary.main' }}
                        startIcon={<ExpandMoreIcon />}
                      >
                        {expandedProducts[pedido.id] ? 'Ver Menos' : 'Ver Más'}
                      </Button>
                      {expandedProducts[pedido.id] && (
                        pedido.cart.slice(1).map((product) => (
                          <Box display="flex" alignItems="center" key={product.id} sx={{ mt: 1 }}>
                            <CardMedia
                              component="img"
                              alt={product.name}
                              height="80"
                              image={product.imageUrl}
                              sx={{ width: 80, mr: 2, borderRadius: 1 }}
                            />
                            <Box>
                              <Typography variant="subtitle1">{product.name}</Typography>
                              <Typography variant="body2">{`Cantidad: ${product.quantity}`}</Typography>
                            </Box>
                          </Box>
                        ))
                      )}
                    </>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(pedido)} sx={{ mr: 1 }} startIcon={<EditIcon />}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(pedido.id)} startIcon={<DeleteIcon />}>
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogContent>
          <Typography variant="h6">Editar Estado y Dirección del Pedido</Typography>
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={updatedAddress}
            onChange={(e) => setUpdatedAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <MenuItem value="en proceso">En Proceso</MenuItem>
              <MenuItem value="fabricación">Fabricación</MenuItem>
              <MenuItem value="enviado">Enviado</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
            Actualizar
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PedidoDashboard;
