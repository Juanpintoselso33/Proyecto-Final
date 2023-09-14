import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/carrito.jpg";
import Favorito from "../../img/favorito.png";
import login from "../../img/login.png";
import cart from "../../img/cart.png";
import lupa from "../../img/lupa.png";
import { Modal, Button } from "react-bootstrap";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogout = () => {
    // Realiza las acciones necesarias para cerrar la sesión del usuario
    setIsLoggedIn(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let logged = await actions.login(email, password);
    if (logged === true) {
      setIsLoggedIn(true);
      navigate('/');
      handleCloseModal();
    }
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="w-100">
        <div className="navbar-header">CARRITO EL TATIN</div>

        <div className="mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
          <div className="d-flex align-items-center">
            <img src={Logo} alt="Logo" className="logo" /> <h5>Carrito el tatin</h5>
          </div>
          <div className="w-50 position-relative">
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
            <img src={Favorito} alt="Favoritos" className="decora" width={30} />
            <Button variant="link" className="login" onClick={isLoggedIn ? handleLogout : handleShowModal}>
              <img src={login} alt="login" className="icono-login" width={30} />
              {isLoggedIn ? "Cerrar sesión" : "Login"}
            </Button>
            <img src={cart} alt="login" className="border-dark ms-2" width={30} />
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
          <ul className="navbar-nav mx-auto ">
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
              <button className="btn btn-info btn-lg btn-block" type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>

            <p className="small mb-5 pb-lg-2">
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p>
              Don't have an account?{" "}
              <a href="#!" className="link-info">
                Register here
              </a>
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>

import RegisterModal from '../component/register'; // Asegúrate de importar correctamente el componente del modal

export const Navbar = () => {
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  // Función para alternar la visibilidad del modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="w-100">
          <div className="navbar-header">
            CARRITO EL TATIN
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
            <div className="d-flex align-items-center">
              <img src={Logo} alt="Logo" className="logo" />
              <h5>Carrito el tatin</h5>
            </div>
            <div className="w-50">
              <input
                type="text"
                className="form-control rounded-pill pr-5"
                placeholder="   Search products..."
                aria-label="Buscar productos"
                aria-describedby="basic-addon1"
              />
              <img
                src={lupa}
                alt="lupa"
                className="border-dark position-absolute top-50 translate-middle-y right-0"
                width={20}
              />
            </div>
            <div className="iconos">
              <img src={Favorito} alt="Favoritos" className="decora" width={30} />
              <Link to="/login" className="login">
                <img src={login} alt="login" className="icono-login" width={30} />
                Login
              </Link>
              <button onClick={toggleModal} className="btn btn-link">Register</button> {/* Botón para abrir el modal */}
              <img src={cart} alt="login" className="border-dark ms-2" width={30} />
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
      {showModal && <RegisterModal />} {/* Muestra el modal si showModal es true */}
    </>
  );
};
