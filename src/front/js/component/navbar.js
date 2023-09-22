import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/carrito.jpg";
import Favorito from "../../img/favorito.png";
import login from "../../img/login.png";
import cartIcon from "../../img/cart.png";
import lupa from "../../img/lupa.png";
import { Modal, Button } from "react-bootstrap";
import "../../styles/cartDropdown.css";
import RegisterModal from './register';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);


  let navigate = useNavigate();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cart, setCart] = useState({ items: [], totalCost: 0 });
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCost: 0 };
    setCart(storedCart);
  }, []);


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    actions.initializeAuth();
  }, [store.isAuthenticated, store.email]);

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleSubmit = async  (email, password) => {
  //console.log(values.email, values.password)
    let logged = await actions.login(email, password);
    if (logged) {
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
  };

  const welcomeMessage = store.email ? store.email.split("@")[0] : "";

  const handleMouseEnter = () => {
    setShowCartDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowCartDropdown(false);
  };


  const handleIncrement = (order_id) => {
    const updatedCartItems = cart.items.map(item => {
      if (item.order_id === order_id) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        console.log(`Incrementing quantity for item ${item.order_id}: ${item.name} to ${updatedItem.quantity}`);
        return updatedItem;
      }
      return item;
    });

    // Calcula el precio total del carrito y actualiza el estado local
    const updatedCart = { ...cart, items: updatedCartItems };
    const total = updatedCart.items.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    updatedCart.totalCost = total;
    setCart(updatedCart);

    // Actualiza el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecrement = (order_id) => {
    const updatedCartItems = cart.items.map(item => {
      if (item.order_id === order_id) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        console.log(`Decrementing quantity for item ${item.order_id}: ${item.name} to ${updatedItem.quantity}`);
        return updatedItem;
      }
      return item;
    }).filter(item => item.quantity > 0);

    // Calcula el precio total del carrito y actualiza el estado local
    const updatedCart = { ...cart, items: updatedCartItems };
    const total = updatedCart.items.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    updatedCart.totalCost = total;
    setCart(updatedCart);

    // Actualiza el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      alert(values.email);
      //navigate('/');
      //handleCloseModal();
      handleSubmit(values.email, values.password)
    },
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="w-100">
          <div className="navbar-header">CARRITO EL TATIN</div>
          {store.isAdmin && (
            <button className="nav-item  mt-2">
              <Link to="/usuarioAdmin" className="nav-link text-black p-1">
                Administrar
              </Link>
            </button>
          )}
          <div className="mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
            <div className="d-flex align-items-center">
              <img src={Logo} alt="Logo" className="logo" />
              <h5>Carrito el tatin</h5>
            </div>
            <div className="w-40 position-relative">
              <input
                type="text"
                className="form-control rounded-pill pr-5"
                placeholder="Search products..."
                aria-label="Buscar productos"
                aria-describedby="basic-addon1"
                style={{ paddingLeft: '40px', backgroundImage: `url(${lupa})`, backgroundPosition: '10px center', backgroundRepeat: 'no-repeat' }}
              />
            </div>

            <div className="iconos" style={{ display: 'flex', alignItems: 'center' }}>
              {store.isAuthenticated && <span>Bienvenido/a, {welcomeMessage}</span>}
              <img src={Favorito} alt="Favoritos" className="decora" width={30} />
              <Button variant="link" className="login" onClick={store.isAuthenticated ? handleLogout : handleShowModal}>
                <img src={login} alt="login" className="icono-login" width={30} />
                {store.isAuthenticated ? "Cerrar sesión" : "Login"}
              </Button>
              {!store.isAuthenticated && <Button variant="link" className="register" onClick={handleShowRegisterModal}>
                Register
              </Button>}
              {store.isAuthenticated &&
                <div
                  className="cart-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Button variant="link" onClick={() => navigate('/cart')}>
                    <img src={cartIcon} alt="cart" className="border-dark ms-2" width={30} /> {/* Icono de carrito restaurado */}
                  </Button>
                  <div className={`cart-dropdown ${showCartDropdown ? 'show' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {cart && cart.items && cart.items.length > 0 ? (
                      cart.items.map((item, index) => (
                        <div className="cart-item" key={item.order_id}>
                          <span className="item-name">{`${index + 1} - ${item.name}`}</span>
                          <span className="item-quantity">
                            {' x '}
                            {item.quantity}
                          </span>
                          <button className="item-increment" onClick={() => handleIncrement(item.order_id)}>+</button>
                          <button className="item-decrement" onClick={() => handleDecrement(item.order_id)}>-</button>
                        </div>
                      ))
                    ) : null}
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
                <Link to="/" className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/catalogo" className="nav-link">
                  Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/comentarios" className="nav-link comentarios">
                  Comentarios
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                aria-activedescendant="emailHelp"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              <label className="form-label" htmlFor="exampleInputEmail">
                Email address
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control form-control-lg"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <label className="form-label" htmlFor="password">
                Password
              </label>
            </div>
            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="submit">
                Login
              </button>
            </div>
            {successMessage && <p>{successMessage}</p>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <RegisterModal show={showRegisterModal} onHide={handleCloseRegisterModal} />

    </>
  );

};