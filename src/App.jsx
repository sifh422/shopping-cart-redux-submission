import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('products')

  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>Redux Shopping Cart</h1>
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`nav-tab ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              Cart
            </button>
          </nav>
        </header>
        
        <main className="app-main">
          {activeTab === 'products' ? <ProductList /> : <Cart />}
        </main>
      </div>
    </Provider>
  )
}

export default App
