import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleRemoveFromCart = (id) => {
    setRemovingItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      dispatch(removeFromCart(id));
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      setUpdatingItems(prev => new Set([...prev, id]));
      dispatch(updateQuantity({ id, quantity }));
      setTimeout(() => {
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 200);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${totalItems} items totaling $${totalPrice.toFixed(2)}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <h2>🛒 Shopping Cart</h2>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>🛒 Shopping Cart</h2>
        <div className="cart-stats">
          <span className="item-count">{totalItems} items</span>
          <button onClick={handleClearCart} className="clear-cart-btn">
            🗑️ Clear Cart
          </button>
        </div>
      </div>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div 
            key={item.id} 
            className={`cart-item ${removingItems.has(item.id) ? 'removing' : ''}`}
          >
            <div className="cart-item-image-container">
              <img src={item.image} alt={item.name} className="cart-item-image" />
            </div>
            
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-category">{item.category}</p>
              <div className="cart-item-rating">
                {'⭐'.repeat(Math.floor(item.rating))} 
                <span className="rating-text">({item.rating})</span>
              </div>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn quantity-decrease"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className={`quantity ${updatingItems.has(item.id) ? 'updating' : ''}`}>
                  {item.quantity}
                </span>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn quantity-increase"
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                <span className="total-label">Total:</span>
                <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => handleRemoveFromCart(item.id)}
                className="remove-btn"
                disabled={removingItems.has(item.id)}
              >
                {removingItems.has(item.id) ? '🗑️ Removing...' : '🗑️ Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal ({totalItems} items):</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span>
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
        >
          🚀 Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;