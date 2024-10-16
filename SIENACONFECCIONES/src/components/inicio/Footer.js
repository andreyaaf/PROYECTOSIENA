import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, bgcolor: 'black', color: 'white' }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Siena Caps
            </Typography>
            <Typography variant="body2" align="center">
              Lo mejor que puedes encontrar
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Contáctanos
            </Typography>
            <Typography variant="body2" align="center">
              Email: siena.confecciones.1@gmail.com
            </Typography>
            <Typography variant="body2" align="center">
              Teléfono: +57 3128448155
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Síguenos
            </Typography>
            <Typography variant="body2" align="center">
              Instagram | Facebook | Twitter
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" align="center">
            © 2024 Siena Caps. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
