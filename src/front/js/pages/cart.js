import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import Logo from "../../img/carrito.jpg";
import Cerrar from "../../img/cerrar.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export const CartView = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState([]);


  const cart = store.cart;

  useEffect(() => {
    localStorage.setItem('your_cart_key', JSON.stringify(store.cart));
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

  // useEffect(() => {
  //   actions.CargarPago()
  // }, []);



  function mover_carrito() {
    navigate("/prueba1122")
  }
  return (
    <section className="vh-100 bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(10, 10, 10, 1)), url(${Logo})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <div className="container d-flex justify-content-center" style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ border: '2px solid #aaa', borderRadius: '30px', padding: '30px', backgroundColor: '#fff', overflowX: 'auto' }}>
          <div className="d-flex justify-content-end">
            <button className="hoverEffect" style={{ backgroundColor: '#000', border: 'none', borderRadius: '50%', color: '#fff', transition: '0.3s' }} onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#fff' }} />
            </button>
          </div>
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 'bolder', color: '#000' }}>Mi Carrito</h2>
          </div>
          <table className="table" style={{ width: '100%', margin: 'auto' }}>
            <thead style={{ backgroundColor: '#000' }}>
              <tr>
                <th scope="col" style={{ backgroundColor: '#000', color: '#fff' }}>#</th>
                <th scope="col" style={{ backgroundColor: '#000', color: '#fff' }}>Productos</th>
                <th scope="col" style={{ backgroundColor: '#000', color: '#fff' }}>Precio</th>
                <th scope="col" style={{ backgroundColor: '#000', color: '#fff' }}>Cantidad</th>
                <th scope="col" style={{ backgroundColor: '#000', color: '#fff' }}>Extras</th>
                <th scope="col" style={{ backgroundColor: '#000', color: '#fff' }}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item, index) => (
                <tr key={item.order_id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <th scope="row" style={{ color: '#fff', backgroundColor: '#000' }}>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>${parseFloat(item.cost).toFixed(2)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <button className="hoverEffect" style={{ backgroundColor: '#000', borderRadius: '50%', color: '#fff', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }} onClick={() => handleIncrement(item.order_id)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <button className="hoverEffect" style={{ backgroundColor: '#000', borderRadius: '50%', color: '#fff', width: '30px', height: '30px', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleDecrement(item.order_id)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </td>
                  <td>
                    {item.extras && item.extras.map((extra, idx) => (
                      <span key={idx} style={{ margin: '3px', padding: '3px', backgroundColor: '#fff', borderRadius: '5px' }}>{extra.name}{idx < item.extras.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  <td>
                    <button className="hoverEffectDelete" style={{ backgroundColor: '#000', border: 'none', borderRadius: '50%', color: '#fff', width: '35px', height: '35px', transition: '0.3s' }} onClick={() => removeFromCart(item.order_id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <h2 style={{ fontWeight: 'bolder', color: '#000' }}>Costo Total: ${totalCost.toFixed(2)}</h2>
            <button className="hoverEffect" style={{ backgroundColor: '#000', borderRadius: '30px', color: '#fff', padding: '15px 30px', fontSize: '20px', transition: '0.3s' }} onClick={() => { actions.createOrder(); mover_carrito() }}>Comprar</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hoverEffect:hover,
        .hoverEffectDelete:hover {
          background-color: #fff;
          color: #000;
        }
        .hoverEffect:active,
        .hoverEffectDelete:active {
          transform: scale(0.9);
        }
        .hoverEffectDelete:active {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }
          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }
          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }
      `}</style>
    </section>
  );
};
