import React, { useState } from 'react'; 
import { Box, Typography, Grid, Button, FormControl, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import CartModal from '../../components/inicio/CartModal';
import ProductCard from '../../components/inicio/ProductCard';
import Footer from '../../components/inicio/Footer';
import QuantityModal from '../../components/inicio/QuantityModal'; 
import { Link } from 'react-router-dom'; 
import Navbar from '../../components/inicio/Navbar'; 

const Gorras = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [filterColor, setFilterColor] = useState('todos');
  const [filterType, setFilterType] = useState('todos');

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setQuantityModalOpen(true);
  };

  const handleQuantityConfirm = (product, quantity) => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
    setQuantityModalOpen(false);
    setCartModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesColor = filterColor === 'todos' || product.color === filterColor;
    const matchesType = filterType === 'todos' || product.type === filterType;
    return matchesColor && matchesType;
  });

  // Obtener colores y tipos únicos de los productos
  const uniqueColors = [...new Set(products.map(product => product.color).filter(color => color))];
  const uniqueTypes = [...new Set(products.map(product => product.type).filter(type => type))];

  // Mapeo de tipos a español
  const typeMap = {
    'curva': 'Curva',
    'plana': 'Plana'
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar sx={{ mb: 2 }} />

      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'row', mt: 2 }}>
        <Box sx={{ width: '250px', pr: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filtrar por
          </Typography>
          
          <Divider sx={{ mb: 2 }} />

          <Typography variant="subtitle1">Color</Typography>
          <FormControl component="fieldset">
            <RadioGroup 
              value={filterColor} 
              onChange={(e) => setFilterColor(e.target.value)}
              sx={{ '& .MuiRadio-root': { color: 'black' }, '& .Mui-checked': { color: 'black' }}}
            >
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              {uniqueColors.map((color, index) => (
                color ? (
                  <FormControlLabel key={index} value={color} control={<Radio />} label={color.charAt(0).toUpperCase() + color.slice(1)} />
                ) : null
              ))}
            </RadioGroup>
          </FormControl>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="subtitle1">Tipo</Typography>
          <FormControl component="fieldset">
            <RadioGroup 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              sx={{ '& .MuiRadio-root': { color: 'black' }, '& .Mui-checked': { color: 'black' }}}
            >
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              {uniqueTypes.map((type, index) => (
                type ? (
                  <FormControlLabel key={index} value={type} control={<Radio />} label={typeMap[type] || type} />
                ) : null
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Gorras
          </Typography>
      
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                  <ProductCard product={product} />
                </Link>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'black', color: 'white', mt: 2 }}
                  onClick={() => handleAddToCart(product)}
                >
                  Añadir al Carrito
                </Button>
              </Grid>
            ))}
          </Grid>

          <CartModal open={cartModalOpen} onClose={() => setCartModalOpen(false)} />
          <QuantityModal 
            open={quantityModalOpen} 
            onClose={() => setQuantityModalOpen(false)} 
            onConfirm={handleQuantityConfirm} 
            product={selectedProduct} 
          />
        </Box>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Gorras;
