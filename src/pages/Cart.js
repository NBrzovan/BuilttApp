import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import backIcon from "../images/back.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartDiscount, setCartDiscount] = useState(0);

  useEffect(() => {
    const fetchCartItems = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
      calculateTotal(storedCartItems);
    };

    fetchCartItems();

    window.addEventListener('storage', fetchCartItems);

    return () => {
      window.removeEventListener('storage', fetchCartItems);
    };
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    let discount = 0;
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    if (totalItems > 3) {
      discount = totalItems * 100; 
    }

    setCartTotal(total);
    setCartDiscount(discount);
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    
    window.dispatchEvent(new Event('storage'));
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    window.dispatchEvent(new Event('storage'));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    window.dispatchEvent(new Event('storage'));
  };

  const inProgress = () => {
    Swal.fire({
      title: 'Funkcionalnost je procesu razvitka...',
      text: `Hvala Vam na ukazanom poverenju.`,
      icon: 'success',
      confirmButtonText: 'U redu'
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tvoja korpa</h2>
      <a href="/products" className="d-inline-flex align-items-center text-decoration-none"><img src={backIcon} alt="backIcon" /> Vrati se na proizvode</a>
      <div className="row mt-3">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <p className="text-center">Korpa je prazna.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item d-flex justify-content-between align-items-center mb-4">
                <img src={item.image} alt={item.name} className="cart-item-img" style={{ width: '100px' }} />
                <div className="cart-item-details" style={{ flex: '1 1 0', minWidth: '0', marginRight: '10px' }}>
                  <h5 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}> {item.name} </h5>
                  <p>{item.price} RSD po kom.</p>
                </div>
                <div className="cart-item-quantity d-flex align-items-center">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="btn btn-link text-danger" onClick={() => removeFromCart(item.id)}>Ukloni</button>
              </div>
            ))
          )}
        </div>
    
        <div className="col-lg-4">
          <div className="card p-3">
            <h4>Tvoja narudžbina</h4>
            <div className="d-flex justify-content-between">
              <p>Ukupno</p>
              <p>{cartTotal} RSD</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Ušteda</p>
              <p>-{cartDiscount} RSD</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Isporuka</p>
              <p>Besplatna</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p>Ukupno za uplatu</p>
              <p>{cartTotal - cartDiscount} RSD</p>
            </div>
            <button className="btn btn-dark btn-block mt-3"  onClick={() => inProgress()} >Prijavi se za brže plaćanje</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
