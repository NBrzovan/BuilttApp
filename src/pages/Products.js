import React, { useEffect, useState } from 'react';
import productsData from '../data/products.json'; 
import cartIcon from "../images/Cart.png"; 
import emptyCart from "../images/empty.png";
import fullCart from "../images/full.png";

import Swal from 'sweetalert2';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isCartFull, setIsCartFull] = useState(false);

  useEffect(() => {
    setProducts(productsData);
    
    const checkCartStatus = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const isFull = cartItems.some(item => item.quantity > 0);
      setIsCartFull(isFull); 
    };

    checkCartStatus();
  }, []);

  const increaseQuantity = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
  
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    const existingProduct = cartItems.find(item => item.id === productToAdd.id);
  
    if (existingProduct) {
      existingProduct.quantity += productToAdd.quantity || 1;
    } else {
      cartItems.push({ ...productToAdd, quantity: productToAdd.quantity || 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    setIsCartFull(cartItems.some(item => item.quantity > 0));
  
    Swal.fire({
      title: 'Uspešno ste dodali proizvod u korpu!',
      text: `${productToAdd.name} sa količinom ${productToAdd.quantity || 1}`,
      icon: 'success',
      confirmButtonText: 'U redu'
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0">Svi proizvodi </h2>
        <span className="mt-2 p-2"> {products.length} proizvoda</span>
      </div>
      <div className="row text-end pb-4"> 
        <div>
          <a className="m-1 cart-link" href="/cart">
            <img className="btn" src={isCartFull ? fullCart : emptyCart} alt="cart" />
          </a>
        </div>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100 text-center">
              <img src={product.image} className="card-img-top p-3" alt={product.name} />
              <h5 className="card-title mt-2">{product.name}</h5>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text text-left mb-0">{product.price} RSD</p>
                  <div className="d-flex align-items-center mx-3">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(product.id)} disabled={product.quantity === 0}>
                      -
                    </button>
                    <span className="mx-2">{product.quantity || 0}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(product.id)}>
                      +
                    </button>
                  </div>
                  <button className="btn bg-dark" onClick={() => addToCart(product.id)}>
                    <img src={cartIcon} alt="cart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
