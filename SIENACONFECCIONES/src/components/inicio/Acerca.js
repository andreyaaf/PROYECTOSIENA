import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Footer from './Footer';

const Acerca = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ my: 4, flexGrow: 1 }}>
        <Box sx={{ 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px', 
          padding: 4, 
          boxShadow: 2 
        }}>
          <Typography variant="h4" gutterBottom align="center">
            Acerca de Nosotros
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Aquí puedes conocer mas sobre nosotros, somos una empresa dedidaca a la confeccion y personalizacion de gorras de la mas alta calidad.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Nuestra Misión
              </Typography>
              <Typography variant="body2">
                Ofrecer productos de alta calidad que combinen estilo y funcionalidad, para satisfacer las necesidades de nuestros clientes.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Nuestra Visión
              </Typography>
              <Typography variant="body2">
                Ser reconocidos como líderes en la industria, innovando constantemente y superando las expectativas de nuestros clientes.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer /> {/* El Footer se mantiene al final */}
    </Box>
  );
};

export default Acerca;
