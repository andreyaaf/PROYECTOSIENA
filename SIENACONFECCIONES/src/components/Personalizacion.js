import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, TextField } from '@mui/material';

const PersonalizarGorra = ({ idGorra, agregarAlCarrito }) => {
  const [color, setColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);
  const [texto, setTexto] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);

  const manejarCambioColor = (evento) => {
    setColor(evento.target.value);
  };

  const manejarCambioLogo = (evento) => {
    const archivo = evento.target.files[0];
    if (archivo) {
      setLogo(archivo);
      setLogoPreview(URL.createObjectURL(archivo));
    }
  };

  const manejarCambioTexto = (evento) => {
    setTexto(evento.target.value);
  };

  const manejarAgregar = () => {
    const personalizacion = {
      id: idGorra,
      color,
      logo,
      texto,
      cantidad: 1,
    };
    agregarAlCarrito(personalizacion);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>Personaliza tu Gorra</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: 3,
            backgroundColor: '#f8f8f8',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Opciones de Personalización</Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>Elige el color:</Typography>
              <input
                type="color"
                value={color}
                onChange={manejarCambioColor}
                style={{ border: 'none', borderRadius: '5px', cursor: 'pointer', width: '60px', height: '30px' }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>Sube tu logo:</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={manejarCambioLogo}
                style={{ marginBottom: '10px' }}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={{ width: '150px', borderRadius: '5px', marginTop: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
                />
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>Escribe un texto personalizado:</Typography>
              <TextField
                value={texto}
                onChange={manejarCambioTexto}
                placeholder="Ingresa un texto..."
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={manejarAgregar}
              sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{
            width: '250px',
            height: '250px',
            backgroundColor: color,
            border: '2px solid #ccc',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: logoPreview ? `url(${logoPreview})` : 'none',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
            { !logoPreview && <Typography variant="body1" color="text.secondary">Vista previa del logo</Typography> }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonalizarGorra;
