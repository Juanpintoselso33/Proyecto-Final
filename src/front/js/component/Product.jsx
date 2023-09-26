import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import "../../styles/Cards1.css"
import { Context } from "../store/appContext";

export const Product = (props) => {
  const { actions } = useContext(Context);  

  const data = {
    idx: props.id,
    urlx: props.url,
    namex: props.name,
    pricex: props.price,
    descriptionx: props.description,
    categoriax: props.category
  }

  const enviarMensaje = () => {
    actions.DataModalDetalle(data)
    console.log(data)
  }

  return (
    <div type="button" className="card cartas" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => enviarMensaje()}  >
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  categoria: PropTypes.string,
};

export default Product;


