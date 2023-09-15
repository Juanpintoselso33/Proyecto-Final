import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { CartStore } from '../component/cartStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Logo from "../../img/carrito.jpg";
import Cerrar from "../../img/cerrar.png";

export const CartView = () => {
  const [cart, setCart] = useState([]);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const initialCart = CartStore.getCart();
    setCart(initialCart);

    const handleStorageChange = () => {
      const updatedCart = CartStore.getCart();
      setCart(updatedCart);
    };

    

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const totalCost = cart.reduce((acc, item) => acc + item.cost, 0);

  // Función para eliminar un elemento del carrito
  const removeFromCart = (orderId) => {
    CartStore.removeFromCart(orderId);
    const updatedCart = CartStore.getCart();
    setCart(updatedCart);
  };

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
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>${item.cost}</td>
                        <td>{item.quantity}</td>
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
                  <h2>Costo Total: ${totalCost}</h2>
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

export default CartView;
