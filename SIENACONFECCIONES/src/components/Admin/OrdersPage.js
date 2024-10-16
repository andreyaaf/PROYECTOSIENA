import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, TextField, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [editingOrder, setEditingOrder] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTotal, setNewTotal] = useState('');
  const [openNewOrderDialog, setOpenNewOrderDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [productError, setProductError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Para verificar los datos
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setNewAddress(order.direccion);
    setNewStatus(order.estado);
    setNewQuantity(order.cantidad);
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setNewQuantity(event.target.value);
  };

  const handleProductChange = (event) => {
    setNewProduct(event.target.value);
  };

  const isProductValid = (productName) => {
    return products.some(product => product.name === productName);
  };

  const handleSaveChanges = async () => {
    if (editingOrder) {
      const updatedOrder = { ...editingOrder, direccion: newAddress, estado: newStatus, cantidad: newQuantity };

      setOrders(orders.map(order => (order.id === editingOrder.id ? updatedOrder : order)));

      await fetch(`http://localhost:5000/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      setEditingOrder(null);
    }
  };

  const handleCloseDialog = () => {
    setEditingOrder(null);
    setOpenNewOrderDialog(false);
    setProductError('');
  };

  const handleOpenNewOrderDialog = () => {
    setOpenNewOrderDialog(true);
  };

  const handleNewOrderChange = (event) => {
    const { name, value } = event.target;
    if (name === 'client') setNewClient(value);
    if (name === 'product') setNewProduct(value);
    if (name === 'quantity') setNewQuantity(value);
    if (name === 'date') setNewDate(value);
    if (name === 'total') setNewTotal(value);
  };

  const handleAddNewOrder = async () => {
    if (!isProductValid(newProduct)) {
      setProductError('El producto no está registrado.');
      return;
    }

    const newOrder = {
      cliente: newClient,
      producto: newProduct,
      cantidad: newQuantity,
      fecha: newDate,
      total: newTotal,
      estado: 'Pendiente',
      direccion: '',
    };

    setOrders([...orders, newOrder]);

    await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    });

    handleCloseDialog();
    setSnackbarMessage('Pedido añadido con éxito.');
    setOpenSnackbar(true);
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      setOrders(orders.filter(order => order.id !== orderId));

      await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'DELETE',
      });

      setSnackbarMessage('Pedido eliminado con éxito.');
      setOpenSnackbar(true);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesClient = order && order.cliente && order.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || (order && order.estado === statusFilter);
    return matchesClient && matchesStatus;
  });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Pedidos</Typography>
              <TextField
                label="Buscar por cliente"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginRight: 2 }}
              />
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                displayEmpty
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Enviado">Enviado</MenuItem>
                <MenuItem value="Entregado">Entregado</MenuItem>
              </Select>
              <Button
                variant="contained"
                sx={{ float: 'right' }}
                onClick={handleOpenNewOrderDialog}
              >
                Nuevo Pedido
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.cliente}</TableCell>
                        <TableCell>{order.producto}</TableCell>
                        <TableCell>{order.cantidad}</TableCell>
                        <TableCell>{order.fecha}</TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.estado}</TableCell>
                        <TableCell>{order.direccion}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(order)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteOrder(order.id)}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No hay pedidos disponibles</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={!!editingOrder} onClose={handleCloseDialog}>
        <DialogTitle>Editar Pedido</DialogTitle>
        <DialogContent>
          <TextField
            label="Nueva Dirección"
            variant="outlined"
            fullWidth
            value={newAddress}
            onChange={handleAddressChange}
            sx={{ mb: 2 }}
          />
          <Select
            value={newStatus}
            onChange={handleStatusChange}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Enviado">Enviado</MenuItem>
            <MenuItem value="Entregado">Entregado</MenuItem>
          </Select>
          <TextField
            label="Cantidad"
            type="number"
            variant="outlined"
            fullWidth
            value={newQuantity}
            onChange={handleQuantityChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveChanges}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNewOrderDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nuevo Pedido</DialogTitle>
        <DialogContent>
          <TextField
            label="Cliente"
            variant="outlined"
            fullWidth
            name="client"
            value={newClient}
            onChange={handleNewOrderChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Producto"
            variant="outlined"
            fullWidth
            name="product"
            value={newProduct}
            onChange={handleNewOrderChange}
            sx={{ mb: 2 }}
            error={!!productError}
            helperText={productError}
          />
          <TextField
            label="Cantidad"
            type="number"
            variant="outlined"
            fullWidth
            name="quantity"
            value={newQuantity}
            onChange={handleNewOrderChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Fecha"
            type="date"
            variant="outlined"
            fullWidth
            name="date"
            value={newDate}
            onChange={handleNewOrderChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Total"
            type="number"
            variant="outlined"
            fullWidth
            name="total"
            value={newTotal}
            onChange={handleNewOrderChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddNewOrder}>Añadir</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
