const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password', // Your email password (consider using environment variables)
  },
});

// Dummy user database
const users = [];

// Registration endpoint
app.post('/users', async (req, res) => {
  const { email, password, name, phoneNumber, role } = req.body;

  // Save user to the "database"
  const newUser = { email, password, name, phoneNumber, role };
  users.push(newUser);

  // Send confirmation email
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Confirmación de Registro',
    text: `Hola ${name},\n\nTu usuario ha sido registrado en Siena Caps.\n\nGracias,\nEl equipo de Siena Caps`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(201).send({ message: 'Usuario registrado y correo enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send({ error: 'Usuario registrado, pero no se pudo enviar el correo de confirmación' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
