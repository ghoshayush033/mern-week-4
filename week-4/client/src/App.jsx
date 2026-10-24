import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { _id: '1', title: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { _id: '2', title: 'Minimalist Mechanical Keyboard', category: 'Electronics', price: 119.50, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
  { _id: '3', title: 'Smart Fitness Tracker Watch', category: 'Wearables', price: 89.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }
];

export default function App() {
  const [view, setView] = useState('shop');
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { id: 'ORD-101', customer: 'Ayush Ghosh', total: 199.99, status: 'Delivered' }
  ]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(p => p._id === product._id);
      if (exist) return prev.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-inner">
          <h2 style={{ color: '#4f46e5', cursor: 'pointer' }} onClick={() => setView('shop')}>⚡ NexisMart</h2>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => setView('shop')}>Shop</span>
            <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => setView('cart')}>Cart ({cart.reduce((s, i) => s + i.qty, 0)})</span>
            <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => setView('admin')}>Admin</span>
          </div>
        </div>
      </nav>

      <main className="container">
        {view === 'shop' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {products.map(p => (
              <div key={p._id} className="card">
                <img src={p.image} alt={p.title} className="card-img" />
                <div style={{ padding: '1rem' }}>
                  <h3>{p.title}</h3>
                  <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>${p.price.toFixed(2)}</p>
                  <button className="btn-primary" onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'cart' && (
          <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? <p>Your cart is empty.</p> : (
              <div>
                <table className="cart-table">
                  <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr></thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.qty}</td>
                        <td>${(item.price * item.qty).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 style={{ marginTop: '1rem' }}>Total: ${total.toFixed(2)}</h3>
                <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => {
                  setOrders([{ id: `ORD-${Date.now().toString().slice(-4)}`, customer: 'Ayush Ghosh', total, status: 'Pending' }, ...orders]);
                  setCart([]);
                  alert('Order successfully placed!');
                  setView('admin');
                }}>Place Order</button>
              </div>
            )}
          </div>
        )}

        {view === 'admin' && (
          <div>
            <h2>Admin Orders Management</h2>
            <table className="cart-table" style={{ marginTop: '1rem' }}>
              <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}><td>{o.id}</td><td>{o.customer}</td><td>${o.total.toFixed(2)}</td><td>{o.status}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}