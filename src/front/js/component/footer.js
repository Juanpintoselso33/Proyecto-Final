import React from "react";
import footer from "../../img/footer.png";

export const Footer = () => (
  <footer style={{ backgroundColor: "#454040", color: "#fff", padding: "10px", marginTop: "20px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center" }}>
      <div className="footer-logo" style={{ flex: "1", marginRight: "20px", textAlign: "left" }}>
        {/* Logo */}
        <img src={footer} alt="Carrito El Tatin" style={{ maxWidth: "100px" }} />
      </div>
   
        {/* Frase */}
        <p>
          ¡En "Carrito el tatin", ofrecemos sabor excepcional, ingredientes frescos y una variedad irresistible a precios razonables para satisfacer tus antojos de comida rápida!
        </p>
     
    </div>
    <div className="footer-copyright" style={{ textAlign: "center" }}>
      <p>&copy; {new Date().getFullYear()} Carrito El Tatin - Todos los derechos reservados</p>
    </div>
  </footer>
);
