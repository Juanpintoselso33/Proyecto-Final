import React, { useState, useEffect, useContext } from "react";
import { CartStore } from './cartStore'; // Asegúrate de que la ruta sea correcta
import PropTypes from 'prop-types';
import "../../styles/Cards1.css"
import { SecHamburguesa } from "../component/SecHamburguesa.jsx"
import { Context } from "../store/appContext";

export const Product = (props, addMensaje) => {
  const { store, actions } = useContext(Context);
  const handleAddToCart = () => {
    const inputQuantity = parseInt(prompt("Ingrese la cantidad de unidades:", "1"), 10);

    if (!isNaN(inputQuantity) && inputQuantity > 0) {
      console.log("Cantidad válida:", inputQuantity);  // Añadir console.log aquí
      CartStore.addToCart(props.id, inputQuantity, props.price, props.name);
    } else {
      console.log("Cantidad no válida:", inputQuantity);  // Añadir console.log aquí
    }
  };

  const data = {
    idx: props.id,
    urlx: props.url,
    namex: props.name,
    pricex: props.price,
    descriptionx: props.description
  }

  const enviarMensaje = () => {


    actions.DataModalDetalle(data)

  }

  return (

    <div type="button" className="card cartas" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => enviarMensaje()}  >

      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      <p>
        {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
      </p>


    </div>

  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Product;


