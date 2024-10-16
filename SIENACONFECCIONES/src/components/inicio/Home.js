import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import Footer from './Footer';  
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import CartModal from './CartModal';
import QuantityModal from './QuantityModal'; 
import { useAuth } from '../../contexts/AuthContext'; 

const Home = () => {
  const { products } = useProducts();
  const { addToCart, cartOpen, toggleCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setQuantityModalOpen(true);
  };

  const handleQuantityConfirm = (product, quantity) => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Obtener los últimos 3 productos agregados (gorras)
  const latestProducts = products.slice(-3);

  // Obtener solo los primeros 9 productos
  const displayedProducts = products.slice(0, 9);

  return (
    <Container maxWidth={false} sx={{ padding: 0, margin: 0, overflow: 'hidden' }}>
      <Carousel />
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Bienvenido a Siena Caps
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Explora nuestras últimas colecciones y productos exclusivos.
        </Typography>
      </Box>
      
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
        Nuestros Productos
      </Typography>
      <Grid container spacing={3}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} 
              onClick={() => handleProductClick(product.id)}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="240"
                image={product.imageUrl}
                sx={{ objectFit: 'cover', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'black', color: 'white', marginTop: 2 }}
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Añadir al Carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/gorras')}
          sx={{ backgroundColor: 'black', color: 'white' }}
        >
          Ver más productos
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', mt: 4 }}>
        Productos Recientes
      </Typography>
      <Grid container spacing={3}>
        {latestProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} 
              onClick={() => handleProductClick(product.id)}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="240"
                image={product.imageUrl}
                sx={{ objectFit: 'cover', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'black', color: 'white', marginTop: 2 }}
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Añadir al Carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />
      <CartModal open={cartOpen} onClose={toggleCart} />
      <QuantityModal 
        open={quantityModalOpen} 
        onClose={() => setQuantityModalOpen(false)} 
        onConfirm={handleQuantityConfirm} 
        product={selectedProduct} 
      />
    </Container>
  );
};

export default Home;
