import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Container from '#components/Container';
import { CartInterface } from '#interfaces/CartInterface';

import './index.css';


function Carts() {
  const [carts, setCarts] = useState<CartInterface[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (Number(id) > 100) {
      return;
    }
    const url = id ? `https://dummyjson.com/users/${id}/carts` : 'https://dummyjson.com/carts';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.carts) {
          setCarts(data.carts);
        }
      });
  }, [id]);

  return (
    <Container>
      <div className="carts">
        <h1>Carts</h1>
        <div className='products-dtls'>
          {
            carts.length > 0 ? (
              carts.map((cart, index) => (
                <div key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e6e6e6' }}>
                  <p>ID: {cart.id}</p>
                  <p>Total: {cart.total}</p>
                  <p>Discounted Total: {cart.discountedTotal}</p>
                  <p>User ID: {cart.userId}</p>
                  <p>Total Products: {cart.totalProducts}</p>
                  <p>Total Quantity: {cart.totalQuantity}</p>
                  <h2>Products</h2>
                  {cart.products.map((product, productIndex) => (
                    <div className='products'
                      key={productIndex}>
                      <p>Title: {product.title}</p>
                      <p>Price: {product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Total: {product.total}</p>
                      <p>Discount Percentage: {product.discountPercentage}</p>
                      <p>Discounted Price: {product.discountedPrice}</p>
                      <img src={product.thumbnail} alt={product.title} />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )
          }
        </div>
      </div>
    </Container>
  );
}

export default Carts;