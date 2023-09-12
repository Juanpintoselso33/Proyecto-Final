import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/carrito.jpg";
import Favorito from "../../img/favorito.png";
import login from "../../img/login.png";
import cart from "../../img/cart.png";
import lupa from "../../img/lupa.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="w-100">
        <div className="navbar-header">
          CARRITO EL TATIN
        </div>

        <div className="mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
          <div className="d-flex align-items-center">
            <img src={Logo} alt="Logo" className="logo"/> <h5 >Carrito el tatin</h5> 
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
            <Link to="/login" className="">
            <img src={login} alt="login" className="icono-login" width={30} />Login
              </Link>
            
           
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
    </nav>
  );
};
