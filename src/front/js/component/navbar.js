import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/carrito.jpg";
import Favorito from "../../img/favorito.png";
import login from "../../img/login.png";
import cart from "../../img/cart.png";
import lupa from "../../img/lupa.png";
import { Modal, Button } from "react-bootstrap";
import RegisterModal from './register';

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  let navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <div className="iconos">
              {store.isAuthenticated && <span>Bienvenido/a, {welcomeMessage}</span>}
              <img src={Favorito} alt="Favoritos" className="decora" width={30} />
              <Button variant="link" className="login" onClick={store.isAuthenticated ? handleLogout : handleShowModal}>
                <img src={login} alt="login" className="icono-login" width={30} />
                {store.isAuthenticated ? "Cerrar sesión" : "Login"}
              </Button>
              {!store.isAuthenticated && <Button variant="link" className="register" onClick={handleShowRegisterModal}>
                Register
              </Button>}
              {store.isAuthenticated && <Button variant="link" onClick={() => navigate('/add_product')}>Agregar Producto</Button>}
              {store.isAuthenticated && <Button variant="link" onClick={() => navigate('/cart')}>
                <img src={cart} alt="cart" className="border-dark ms-2" width={30} />
              </Button>}
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
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example18"
                name="email"
                className="form-control form-control-lg"
                value={email}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form2Example18">
                Email address
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example28"
                name="password"
                className="form-control form-control-lg"
                value={password}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form2Example28">
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