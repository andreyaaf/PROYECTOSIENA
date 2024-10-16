import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantityModal = ({ open, onClose, onConfirm, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleConfirm = () => {
    if (quantity > 0) {
      onConfirm(product, quantity);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom align="center">
          Selecciona Cantidad
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" alignItems="center" mb={2}>
            <Button onClick={handleDecrement} variant="outlined" color="primary" sx={{ minWidth: 40 }}>
              <RemoveIcon />
            </Button>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ mx: 2, width: 60 }}
              variant="outlined"
              color="primary"
              disabled
            />
            <Button onClick={handleIncrement} variant="outlined" color="primary" sx={{ minWidth: 40 }}>
              <AddIcon />
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{ width: '50%', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
          >
            Confirmar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuantityModal;
