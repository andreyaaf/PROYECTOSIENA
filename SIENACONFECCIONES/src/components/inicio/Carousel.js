import React from 'react';
import { Box, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const CarouselComponent = () => {
  return (
    <Box
      sx={{
        width: '100vw', // Ancho completo de la ventana
        overflow: 'hidden', // Evitar el desbordamiento
        position: 'relative' // Posicionar elementos en relación a este contenedor
      }}
    >
      <Carousel
        infiniteLoop
        autoPlay
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        swipeable
        emulateTouch
        sx={{ height: '100vh' }} // Alto completo de la ventana
      >
        <Box
          sx={{
            position: 'relative',
            height: '100vh', // Alto completo de la ventana
            backgroundImage: 'url(https://neweraco.vtexassets.com/assets/vtex.file-manager-graphql/images/81423ce4-bcd6-4b61-9bba-f5d565a1c396___61c8c0e0f88fd50475b091e21236fbd3.jpg)',
            backgroundSize: 'cover', // Ajustar la imagen para cubrir todo el área
            backgroundPosition: 'center' // Centrar la imagen
          }}
        >
          <Typography
            variant="h3"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente para mejor legibilidad
              padding: '10px',
              borderRadius: '8px'
            }}
          >
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            height: '100%', // Alto completo de la ventana
            backgroundImage: 'url(https://neweraco.vtexassets.com/assets/vtex.file-manager-graphql/images/577cfd57-80ef-4d42-bdc0-953c588914d8___ff58b7a051910d5e81824f9367ef7b47.jpg)',
            backgroundSize: 'cover', // Ajustar la imagen para cubrir todo el área
            backgroundPosition: 'center' // Centrar la imagen
          }}
        >
          <Typography
            variant="h3"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente para mejor legibilidad
              padding: '10px',
              borderRadius: '8px'
            }}
          >
          </Typography>
        </Box>
        {/* Agrega más imágenes aquí si es necesario */}
      </Carousel>
    </Box>
  );
};

export default CarouselComponent;
