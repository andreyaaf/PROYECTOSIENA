import React from 'react';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';

const EmptyCartModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Carrito Vacío
        </Typography>
        <Typography variant="body1">
          No puedes realizar un pedido porque tu carrito está vacío.
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EmptyCartModal;
