import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/inicio/Navbar';
import Home from './components/inicio/Home';
import Gorras from './components/Productos/Gorras';
import Personalizacion from './components/Personalizacion';
import Acerca from './components/inicio/Acerca';
import AdminDashboard from './components/Admin/AdminDashboard';
import UsersPage from './components/Admin/UsersPage';
import ProductsPage from './components/Admin/ProductsPage';
import OrdersPage from './components/Admin/OrdersPage';
import InicioAdmin from './components/Admin/InicioAdmin';
import Pedido from './components/Productos/Pedido';
import PedidoDashboard from './components/Admin/PedidoDashboard'; 
import EmployeeDashboard from './components/Empleado/EmployeeDashboard';
import ProductDetail from './components/inicio/ProductDetail'; // Importa el nuevo componente
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {/* Rutas con Navbar */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route
                path="pedido"
                element={
                  <>
                    <Navbar />
                    <Pedido />
                  </>
                }
              />
              <Route
                path="/gorras"
                element={
                  <>
                    <Navbar />
                    <Gorras />
                  </>
                }
              />
              <Route
                path="/personalizacion"
                element={
                  <>
                    <Navbar />
                    <Personalizacion />
                  </>
                }
              />
              <Route
                path="/acerca"
                element={
                  <>
                    <Navbar />
                    <Acerca />
                  </>
                }
              />
              {/* Ruta para detalles de producto */}
              <Route path="/products/:productId" element={<ProductDetail />} />

              {/* Rutas del Administrador */}
              <Route path="/admin/*" element={<AdminDashboard />}>
                <Route path="users" element={<UsersPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<PedidoDashboard />} />
                <Route path="inicioadmin" element={<InicioAdmin />} />
              </Route>

              {/* Rutas del Empleado */}
              <Route path="/employee/*" element={<EmployeeDashboard />}>
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
