import React, { useState } from 'react';
import { Dialog, DialogContent, Tabs, Tab, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import bcrypt from 'bcryptjs'; // Asegúrate de instalar bcryptjs

const AuthModal = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmación de contraseña
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const validatePassword = (password) => {
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^3\d{9}$/; // Debe empezar por 3 y tener 10 dígitos
    if (!phoneRegex.test(phoneNumber)) {
      setError('El número de celular debe comenzar con 3 y tener 10 dígitos.');
      return false;
    }
    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateEmailFormat(email) || !validatePassword(password)) return;

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { email }
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          login(user);
          onClose();
        } else {
          setError('Credenciales inválidas');
        }
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      console.error("Error al intentar iniciar sesión:", err);
      setError('Error al iniciar sesión. Verifica la conexión al servidor.');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateEmailFormat(email) || !validatePassword(password) || !validatePhoneNumber(phoneNumber)) return;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Incriptar la contraseña

    try {
      await axios.post('http://localhost:5000/users', { email, password: hashedPassword, name, phoneNumber, role: 'customer' });
      setError('');
      onClose();
    } catch (err) {
      console.error("Error al intentar registrarse:", err);
      setError('Error al registrarse');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Registro" />
        </Tabs>
        {tabIndex === 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Iniciar Sesión
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              fullWidth
              margin="normal"
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} fullWidth onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </div>
        )}
        {tabIndex === 1 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Registro
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              type="text"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Número Celular"
              type="text"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
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
                )
              }}
            />
            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} fullWidth onClick={handleRegister}>
              Registrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
