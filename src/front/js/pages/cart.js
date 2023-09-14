import React, { useState, useEffect } from 'react';

export const CartView = () => {
  const [cart, setCart] = useState([]);

  // Calcular el costo total del carrito
  const totalCost = cart.reduce((acc, item) => acc + item.cost, 0);

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.product_id === productId) {
        return {
          ...item,
          quantity: newQuantity,
          cost: item.cost / item.quantity * newQuantity
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product_id !== productId);
    setCart(updatedCart);
  };

  return (
    <section className="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Carrito de Compras</h2>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Cantidad</th>
                        <th>Costo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product_id}</td>
                          <td>{item.product.name}</td>
                          <td><img src={item.product.img_url} alt={item.product.name} width="50" height="50" /></td>
                          <td>{item.quantity}</td>
                          <td>{item.cost}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => {/* Aquí tu función para eliminar */}}>Eliminar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h2 className="text-center">Costo Total: {totalCost}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default CartView;
