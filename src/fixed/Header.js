import React from 'react';
import { Link } from 'react-router-dom';
import LogoIMG from '../images/fixed/builttLogo.png';
import cartIcon from "../images/Cart.png"; 

const Header = () => {

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="#" className="navbar-brand">
          <img src={LogoIMG} className="card-img-top p-3" alt="Builtt logo" />
        </Link>

        <div className="cart-icon">
          <Link to="/cart" className="nav-link d-flex align-items-center">
            <button className="btn bg-dark">
              <img src={cartIcon} alt="cart" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
