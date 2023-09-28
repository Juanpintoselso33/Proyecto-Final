import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/carrito.jpg";
import Login from './login';
import login from "../../img/login.png";
import cartIcon from "../../img/cart.png";
import { Modal, Button } from "react-bootstrap";
import "../../styles/cartDropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const getIsAdminFromLocalStorage = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin === 'true';
};

export const Navbar = ({ setSeccionActiva }) => {

  const [isAdmin, setIsAdmin] = useState(getIsAdminFromLocalStorage());
  const [forceUpdate, setForceUpdate] = useState(false);

  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  
  const [successMessage, setSuccessMessage] = useState("");

  let navigate = useNavigate();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cart, setCart] = useState({ items: [], totalCost: 0 });

  const handleLoginError = (errorMessage) => {
    console.error(errorMessage);
  };

  useEffect(() => {
    setIsAdmin(getIsAdminFromLocalStorage());
  }, [forceUpdate]);

  useEffect(() => {
    setCart(store.cart);
  }, [store.cart]);


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    actions.initializeAuth();
  }, [store.isAuthenticated, store.email]);

  const { email, password } = formData;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (email, password) => {
    let logged = await actions.login(email, password);
    if (logged) {
      setForceUpdate(!forceUpdate);
      setSuccessMessage("Login exitoso, cerrando ventana...");
      setTimeout(() => {
        navigate('/');
        handleCloseModal();
        setSuccessMessage("");
      }, 2000);
    }
  };

  const handleLogout = () => {
    actions.logout();
    setForceUpdate(!forceUpdate);
  };

  const welcomeMessage = store.email ? store.email.split("@")[0] : "";

  const handleMouseEnter = () => {
    setShowCartDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowCartDropdown(false);
  };

  const handleIncrementNavbar = (order_id) => {
    actions.handleIncrement(order_id);
  };

  const handleDecrementNavbar = (order_id) => {
    actions.handleDecrement(order_id);
  };

  const renderProfileIcon = () => {
    const initial = store.email ? store.email.charAt(0).toUpperCase() : '';
    return (
      <Link to="/usuarioEstandar" className="nav-link">
        <span
          className="perfil-inicial"
          style={{
            backgroundColor: '#7a7a7a',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '24px'
          }}
        >
          {initial}
        </span>
      </Link>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="w-100">
          <div className="navbar-header">CARRITO EL TATIN</div>
          <div className="mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
            <div className="d-flex align-items-center">
              <img src={Logo} alt="Logo" className="logo" />
              <h5>Carrito el tatin</h5>
            </div>
            <div className="iconos d-flex align-items-center justify-content-center">
              {store.isAuthenticated && <span className="d-flex align-items-center">Bienvenido/a, {welcomeMessage}</span>}
              <div className="perfil-icon d-flex align-items-center" style={{ marginLeft: '10px' }}>
                {store.isAuthenticated && renderProfileIcon()}
              </div>
              <Button
                variant="btn-light"
                className="btn-secondary"
                onClick={store.isAuthenticated ? handleLogout : handleShowModal}
              >
                <span className="align-self-center">{store.isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}</span>
              </Button>
             
              {store.isAuthenticated &&
                <div
                  className="cart-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Button variant="link hoverEffect" onClick={() => navigate('/cart')}>
                    <img src={cartIcon} alt="cart" className="border-dark ms-2" width={30} />
                  </Button>
                  <div className={`cart-dropdown ${showCartDropdown ? 'show' : ''}`}>
                    {cart && cart.items && cart.items.length > 0 ? (
                      cart.items.map((item, index) => (
                        <div className="cart-item" key={item.order_id}>
                          <span className="item-name">{`${index + 1} - ${item.name}`}</span>
                          <span className="item-quantity">
                            {' x '}
                            {item.quantity}
                          </span>
                          <button className="item-increment" onClick={() => handleIncrementNavbar(item.order_id)}>
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <button className="item-decrement" onClick={() => handleDecrementNavbar(item.order_id)}>
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      ))
                    ) : <div className="cart-empty">El carrito está vacío.</div>}
                    {cart && cart.items && cart.items.length > 0 && (
                      <div className="cart-total">
                        Total: ${cart.totalCost}
                      </div>
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setSeccionActiva("Inicio")}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setSeccionActiva("Catalogo")}>
                  Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setSeccionActiva("Contacto")}>
                  Contacto
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link
                    to="/usuarioAdmin"
                    className="nav-link"
                    onClick={() => setSeccionActiva("Administrar")}
                  >
                    Administrar
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Login 
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        successMessage={successMessage}
        loginError={handleLoginError} 
        
      />
    </>
  );
};
