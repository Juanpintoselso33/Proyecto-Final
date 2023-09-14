import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Logo from "../../img/carrito.jpg";
import Cerrar from "../../img/cerrar.png";



export const CartView = () => {
  const [cart, setCart] = useState([]);
   const navigate = useNavigate();

  // Calcular el costo total del carrito
  const totalCost = cart.reduce((acc, item) => acc + item.cost, 0);

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.product_id === productId) {
        return {
          ...item,
          quantity: newQuantity,
          cost: (item.cost / item.quantity) * newQuantity,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = productId => {
    const updatedCart = cart.filter(item => item.product_id !== productId);
    setCart(updatedCart);
  };






































































  //trabaja Karol
  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(10, 10, 10, 1)), url(${Logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      
    >
      
       
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 ">
              <div className=''
                style={{
                  border: '1px solid #ccc',
                  padding: '20px',
                  borderRadius: '15px',
                  background: "white"
                }}
              >
                  <div
                  className=""
                  
                  onClick={() => navigate('/')} 
                >
                 <img src={Cerrar} alt="Logo" className="logo"  style={{
                  
                   top: '10px',
                   right: '10px',
                   cursor: 'pointer',
                   width: '30px',
                   height: '30px',
                  }} />
                </div>
                
                <h2 className="text-uppercase text-center mb-5">Mi Carrito</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Productos</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <div>
                            <img src={item.product.img_url} alt={item.product.name} width="50" height="50" />
                            <span>{item.product.name}</span>
                          </div>
                        </td>
                        <td>{item.cost}</td>
                        <td>
                          <div>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateCartItem(item.product_id, e.target.value)}
                            />
                            <button className="btn btn-danger" onClick={() => removeFromCart(item.product_id)}>
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2 className="text-center">Costo Total: {totalCost}</h2>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                    
                    }}
                  >
                    Comprar
                    
                  </button>
                
                  
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
