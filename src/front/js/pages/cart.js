import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import Logo from "../../img/carrito.jpg";
import Cerrar from "../../img/cerrar.png";

export const CartView = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], totalCost: 0 });


  useEffect(() => {
    setCart(store.cart);
  }, [store.cart]);


  const handleIncrement = (order_id) => {
    actions.handleIncrement(order_id);
  };

  const handleDecrement = (order_id) => {
    actions.handleDecrement(order_id);
  };

  const removeFromCart = (order_id) => {
    actions.removeFromCart(order_id);
  };

  const totalCost = cart.totalCost || 0;

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(10, 10, 10, 1)), url(${Logo})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="p-4" style={{ border: '1px solid #ccc', borderRadius: '15px', background: 'white' }}>
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  <img src={Cerrar} alt="Cerrar" style={{ width: '30px', height: '30px' }} />
                </div>

                <div className="text-center mb-4">
                  <h2 className="text-uppercase">Mi Carrito</h2>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Productos</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item, index) => (
                      <tr key={item.order_id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>${parseFloat(item.cost).toFixed(2)} (<span>${(item.cost / item.quantity).toFixed(2)} c/u</span>)</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleIncrement(item.order_id)}
                          >
                            +
                          </button>
                          {item.quantity}
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDecrement(item.order_id)}
                          >
                            -
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeFromCart(item.order_id)}
                            style={{
                              color: 'white',
                              backgroundColor: 'red',
                              border: 'none',
                              borderRadius: '50%',
                              width: '30px',
                              height: '30px',
                              padding: '0',
                              fontSize: '18px'
                            }}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center">
                  <h2>Costo Total: ${totalCost.toFixed(2)}</h2>
                  <button
                    className="btn btn-success"
                    onClick={() => actions.createOrder()}
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
