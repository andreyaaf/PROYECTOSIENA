import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const DashboardBoxes = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      // Obtener productos
      const productsResponse = await fetch('http://localhost:5000/products');
      const productsData = await productsResponse.json();
      setProductsCount(productsData.length);

      // Obtener usuarios
      const usersResponse = await fetch('http://localhost:5000/users');
      const usersData = await usersResponse.json();
      setUsersCount(usersData.length);

      // Contar clientes (usuarios con rol "customer")
      const clientsCount = usersData.filter(user => user.role === 'customer').length;
      setClientsCount(clientsCount);

      // Obtener ventas
      const ordersResponse = await fetch('http://localhost:5000/orders');
      const ordersData = await ordersResponse.json();
      setSalesCount(ordersData.length);
      
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Llamada a la API al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Caja de Productos */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{productsCount} Productos</Typography>
              <Button variant="contained" component={Link} to="/admin/products">
                Ver más
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Caja de Ventas */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{salesCount} Ventas</Typography>
              <Button variant="contained" component={Link} to="/admin/orders">
                Nueva Venta
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Caja de Clientes */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{clientsCount} Clientes</Typography>
              <Button variant="contained" component={Link} to="/admin/users">
                Ver más
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Caja de Usuarios */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{usersCount} Usuarios</Typography>
              <Button variant="contained" component={Link} to="/admin/users">
                Ver más
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardBoxes;
