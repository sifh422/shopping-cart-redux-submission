import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { products } from '../data/products'
import './ProductList.css'

const ProductList = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const [addedItems, setAddedItems] = useState(new Set())

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    
    // Add visual feedback
    setAddedItems(prev => new Set([...prev, product.id]))
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 1000)
  }

  const getItemQuantityInCart = (productId) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>)
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>)
    }
    
    return stars
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Premium Products</h2>
        <p className="subtitle">Discover our curated collection of high-quality tech products</p>
      </div>
      <div className="products-grid">
        {products.map(product => {
          const quantityInCart = getItemQuantityInCart(product.id)
          const isJustAdded = addedItems.has(product.id)
          
          return (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <div className="product-category">{product.category}</div>
                {quantityInCart > 0 && (
                  <div className="cart-badge">{quantityInCart}</div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="rating-text">({product.rating})</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <div className="product-price">${product.price}</div>
                  <div className="product-actions">
                    <button 
                      className={`add-to-cart-btn ${isJustAdded ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={isJustAdded}
                    >
                      {isJustAdded ? (
                        <>
                          <span className="checkmark">✓</span>
                          Added!
                        </>
                      ) : (
                        <>
                          <span className="cart-icon">🛒</span>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList