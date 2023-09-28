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
    <div 
      type="button" 
      className="card cartas" 
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal" 
      onClick={() => enviarMensaje()}
      style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'center' }}
    >
      <img 
        className="product--image" 
        src={props.url} 
        alt="product image" 
        style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
      />
      <h2 style={{ fontSize: '1.2em', color: '#333' }}>{props.name}</h2>     
      <p style={{ fontSize: '0.9em', color: '#777' }}>{props.description}</p>
      <p className="price font-weight-bold" style={{ fontSize: '1em', color: '#000' }}>${props.price}</p>
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


