import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Products from './pages/products/Products';
import About from './pages/about/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminCategories from './pages/admin/categories/AdminCategories';
import Orders from './pages/admin/orders/Orders';
import AdminProducts from './pages/admin/products/AdminProducts';
import Users from './pages/admin/users/Users';

function App() {
  return (
    <div className="App"> 
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/admin/categories" element={<AdminCategories />}/>
                <Route path="/admin/users" element={<Users />}/>
                <Route path="/admin/products" element={<AdminProducts />}/>
                <Route path="/admin/orders" element={<Orders />}/>
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;