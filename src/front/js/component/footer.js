import React from "react";
import footer from "../../img/footer.png";
import "../../styles/footer.css"
export const Footer = () => (
  <footer className="footer_F" style={{ backgroundColor: "#454040", color: "#fff", marginTop: "20px" }}>
    <div style={{ maxWidth: "1200px", display: "flex", alignItems: "center" }}>
      <div className="footer-logo " style={{ flex: "1", marginRight: "20px", textAlign: "left" }}>
        {/* Logo */}
        <img src={footer} alt="Carrito El Tatin" style={{ maxWidth: "100px" }} />
      </div>

      {/* Frase */}
      <p>
        ¡En "Carrito el tatin", ofrecemos sabor excepcional, ingredientes frescos y una variedad irresistible a precios razonables para satisfacer tus antojos de comida rápida!
      </p>

    </div>
    <div className="footer-copyright" style={{ textAlign: "center" }}>
      <p className="parrafoP">&copy; {new Date().getFullYear()} Carrito El Tatin - Todos los derechos reservados</p>
      
    </div>
  </footer>
);
