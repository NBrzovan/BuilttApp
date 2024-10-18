import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Head from '../src/fixed/Head';
import Header from '../src/fixed/Header';
import Footer from '../src/fixed/Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Head />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer className="mt-auto"/> 
      </div>
    </Router>
  );
}

export default App;
