import React from 'react';
import { Dialog, DialogContent, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../components/inicio/AuthModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

// Función para formatear precios
const formatPrice = (price) => {
  const priceString = String(price).replace('.', '').replace(',', '.'); // Asegúrate de que sea una cadena
  const priceNumber = parseFloat(priceString);
  if (isNaN(priceNumber)) return '0'; // Manejo de valores no numéricos
  return priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formato sin ceros finales
};

const CartModal = ({ open, onClose }) => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  const handlePlaceOrder = () => {
    if (auth) {
      navigate('/pedido');
    } else {
      setAuthModalOpen(true);
    }
  };

  const totalValue = cart.reduce((total, product) => {
    const price = String(product.price).replace('.', '').replace(',', '.'); // Asegúrate de que sea una cadena
    const priceNumber = parseFloat(price);
    return total + (priceNumber * product.quantity);
  }, 0);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100%',
            width: '400px',
            overflowY: 'auto',
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Carrito de Compras
          </Typography>
          <List>
            {cart.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={`$${formatPrice(product.price)} × ${product.quantity}`}
                />
                <IconButton onClick={() => updateQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{product.quantity}</Typography>
                <IconButton onClick={() => updateQuantity(product.id, product.quantity + 1)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => removeFromCart(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${formatPrice(totalValue)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePlaceOrder}
            sx={{ mt: 2 }}
          >
            Realizar Pedido
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={clearCart}
            sx={{ mt: 2 }}
          >
            Vaciar Carrito
          </Button>
        </DialogContent>
      </Dialog>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default CartModal;
