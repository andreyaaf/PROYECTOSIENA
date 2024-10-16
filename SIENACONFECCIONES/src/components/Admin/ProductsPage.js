import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('flat'); // Default to 'flat'
  const [action, setAction] = useState('add');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpen = (product = null) => {
    setEditProduct(product);
    setName(product ? product.name : '');
    setDescription(product ? product.description : '');
    setPrice(product ? product.price : '');
    setImageUrl(product ? product.imageUrl : '');
    setColor(product ? product.color : '');
    setType(product ? product.type : 'flat'); // Default to 'flat' if editing
    setAction(product ? 'edit' : 'add');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setColor('');
    setType('flat'); // Reset to default
  };

  const handleSave = async () => {
    try {
      const productData = { name, description, price, imageUrl, color, type };
      if (action === 'add') {
        await axios.post('http://localhost:5000/products', productData);
      } else if (action === 'edit') {
        await axios.put(`http://localhost:5000/products/${editProduct.id}`, productData);
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} startIcon={<AddIcon />}>
        Añadir Producto
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100px', borderRadius: '4px' }} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {action === 'add' ? 'Añadir Producto' : 'Modificar Producto'}
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Precio"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="URL de Imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="Plana">Plana</MenuItem>
              <MenuItem value="Curva">Curva</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth onClick={handleSave} sx={{ mt: 2 }}>
            {action === 'add' ? 'Añadir' : 'Guardar'}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
