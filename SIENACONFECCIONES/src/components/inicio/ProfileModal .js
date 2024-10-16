import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, TextField, Button, Typography, Avatar, Grid, InputAdornment, IconButton } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ProfileModal = ({ open, onClose, onUpdate }) => {
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para confirmación de contraseña
  const [success, setSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación
  const [phoneError, setPhoneError] = useState('');

  // Cargar datos del usuario al abrir el modal
  useEffect(() => {
    if (auth && open) {
      setName(auth.name || '');
      setEmail(auth.email || '');
      setPhone(auth.phoneNumber || '');
      setCurrentPassword('');
      setConfirmPassword(''); // Reinicia confirmPassword
      setSuccess('');
    }
  }, [auth, open]);

  const validatePhone = (phone) => {
    const phoneRegex = /^3\d{9}$/; // Empieza con 3 y tiene 10 dígitos
    if (!phoneRegex.test(phone)) {
      setPhoneError('El número de celular debe comenzar con 3 y tener 10 dígitos.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (!email || !name || !phone || !currentPassword || !confirmPassword) {
      setSuccess('Por favor, completa todos los campos y verifica tu contraseña actual.');
      return;
    }

    if (confirmPassword !== currentPassword) {
      setSuccess('La contraseña de confirmación no coincide.');
      return;
    }

    if (!validatePhone(phone)) return; // Validar número de teléfono

    try {
      // Verificar la contraseña actual antes de actualizar
      const verifyResponse = await axios.post(`http://localhost:5000/users/verify`, {
        id: auth.id,
        password: currentPassword
      });

      if (verifyResponse.data.valid) {
        const response = await axios.put(`http://localhost:5000/users/${auth.id}`, { 
          name, 
          email, 
          phoneNumber: phone 
        });
        setAuth({ ...auth, name, email, phone }); // Actualiza el contexto
        setSuccess('Datos actualizados correctamente.');

        // Llama a la función onUpdate si existe
        if (onUpdate) onUpdate(response.data); 
        onClose();
      } else {
        setSuccess('La contraseña actual es incorrecta.');
      }
    } catch (err) {
      console.error("Error al actualizar los datos:", err);
      setSuccess('Error al actualizar los datos. Inténtalo de nuevo.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 64, height: 64, marginBottom: 2, bgcolor: 'transparent', border: '2px solid black' }}>
              <PersonIcon sx={{ color: 'black' }} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
              Modificar Datos
            </Typography>
            {success && <Typography color={success.startsWith('Error') ? 'error' : 'success'}>{success}</Typography>}
            {phoneError && <Typography color="error">{phoneError}</Typography>}
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Número de Celular"
              type="text"
              variant="outlined"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value);
              }}
              error={!!phoneError}
              helperText={phoneError}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña Actual"
              type={showCurrentPassword ? 'text' : 'password'}
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirmar Contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <Button 
              variant="contained" 
              sx={{ bgcolor: 'black', color: 'white', borderRadius: 20, '&:hover': { bgcolor: 'darkgrey' } }} 
              fullWidth 
              onClick={handleUpdateProfile} 
              sx={{ mt: 2 }}
            >
              Actualizar Datos
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              fullWidth 
              onClick={onClose} 
              sx={{ mt: 1, borderRadius: 20 }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
