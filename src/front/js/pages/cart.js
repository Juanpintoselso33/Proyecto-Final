import React, { useState, useEffect } from 'react';
import { CartStore } from '../component/cartStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CartView = () => {
  const [cart, setCart] = useState([]);

  // Obtener el estado inicial del carrito
  useEffect(() => {
    const initialCart = CartStore.getCart();
    setCart(initialCart);
  }, []);

  // No necesitas escuchar eventos de CartStore, así que elimina ese useEffect

  const totalCost = cart.reduce((acc, item) => acc + item.cost, 0);

  // Función para eliminar un elemento del carrito
  const removeFromCart = (productId) => {
    CartStore.removeFromCart(productId);
    const updatedCart = CartStore.getCart();
    setCart(updatedCart);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-5">Carrito de Compras</h2>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.product_id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.cost}</td>
              <td>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.product_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-center">Costo Total: {totalCost}</h2>
    </div>
  );
};

export default CartView;
