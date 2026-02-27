import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainPage.css";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = async () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    await axios.post("http://localhost:5000/order",
      { products: cart, total },
      { headers: { Authorization: token } }
    );

    alert("Order Placed!");
    setCart([]);
  };

  return (
    <div className="container">
      <h2>E-Commerce Store</h2>

      <div className="products">
        {products.map(p => (
          <div key={p._id} className="card">
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h3>Cart</h3>
        {cart.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
        {cart.length > 0 && (
          <button onClick={placeOrder}>Place Order</button>
        )}
      </div>
    </div>
  );
};

export default MainPage;
