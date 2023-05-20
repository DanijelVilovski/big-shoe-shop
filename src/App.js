import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Products from './pages/products/Products';
import SingleProduct from './pages/products/SingleProduct';
import About from './pages/about/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminCategories from './pages/admin/categories/AdminCategories';
import Orders from './pages/admin/orders/Orders';
import AdminProducts from './pages/admin/products/AdminProducts';
import Users from './pages/admin/users/Users';
import EditProduct from './pages/admin/products/EditProduct';

function App() {

  const orders = <Orders />

  return (
    <div className="App"> 
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />}/>
                <Route path="/product/:id" element={<SingleProduct />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={
                  <ProtectedRoute component={<Login />} auth={true}/>
                }> 
                </Route>
                <Route path="/register" element={
                  <ProtectedRoute component={<Register />} auth={true}/>
                }> 
                </Route>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/admin/categories" element={
                  <ProtectedRoute component={<AdminCategories />} />
                }> 
                </Route>
                <Route path="/admin/users" element={
                  <ProtectedRoute component={<Users />} />
                }> 
                </Route>
                <Route path="/admin/products" element={
                  <ProtectedRoute component={<AdminProducts />} />
                }> 
                </Route>
                <Route path="/admin/products/edit/:id" element={<EditProduct />}/>
                <Route path="/admin/orders" element={
                  <ProtectedRoute component={orders} />
                }> 
                </Route>
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;