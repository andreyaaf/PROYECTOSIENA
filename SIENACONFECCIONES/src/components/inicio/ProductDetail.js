import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, Select, MenuItem, FormControl, TextField, IconButton } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../inicio/Navbar';
import Footer from '../inicio/Footer';
import PaymentIcon from '@mui/icons-material/Payment';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === productId);
  const recommendations = products.filter(p => p.id !== productId).slice(0, 3);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Typography variant="h6">Producto no encontrado</Typography>;
  }

  // Define the sizes for caps
  const sizeOptions = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity, size: selectedSize });
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1)); // Ensure minimum of 1
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h6">Precio: ${product.price}</Typography>
            <Typography variant="body1">{product.description}</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">Métodos de Pago</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <PaymentIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Nequi</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <MoneyOffIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Pago contra entrega</Typography>
              </Box>
            </Box>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Talla</MenuItem>
                {sizeOptions.map((size) => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Styled Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <IconButton onClick={handleDecrease} aria-label="decrease quantity">
                <RemoveIcon />
              </IconButton>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                sx={{ width: '60px', mx: 1 }}
              />
              <IconButton onClick={handleIncrease} aria-label="increase quantity">
                <AddIcon />
              </IconButton>
            </Box>

            <Button 
              variant="contained" 
              onClick={handleAddToCart} 
              sx={{ mt: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
            >
              Añadir al Carrito
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5">Recomendaciones</Typography>
          <Grid container spacing={2}>
            {recommendations.map((recProduct) => (
              <Grid item xs={12} sm={6} md={4} key={recProduct.id}>
                <Card>
                  <Link to={`/products/${recProduct.id}`} style={{ textDecoration: 'none' }}>
                    <img src={recProduct.imageUrl} alt={recProduct.name} style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
                    <Typography>{recProduct.name}</Typography>
                    <Typography>${recProduct.price}</Typography>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
