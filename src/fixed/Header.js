import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoIMG from '../images/fixed/builttLogo.png';
import cartIcon from "../images/Cart.png";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    };
    updateCartCount();

    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const isLoginPage = location.pathname === '/login';

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="#" className="navbar-brand">
          <img src={LogoIMG} className="card-img-top p-3" alt="Builtt logo" />
        </Link>

        {!isLoginPage && ( 
          <div className="cart-icon">
            <Link to="/cart" className="nav-link d-flex align-items-center">
              <button className="btn bg-dark position-relative">
                <img src={cartIcon} alt="cart" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
