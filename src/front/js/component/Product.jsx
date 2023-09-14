import React from 'react';
import {CartStore} from './cartStore'; // Asegúrate de que la ruta sea correcta
import PropTypes from 'prop-types';

export const Product = (props) => {
  const handleAddToCart = () => {
    const inputQuantity = parseInt(prompt("Ingrese la cantidad de unidades:", "1"), 10);

    if (!isNaN(inputQuantity) && inputQuantity > 0) {
      console.log("Cantidad válida:", inputQuantity);  // Añadir console.log aquí
      CartStore.addToCart(props.id, inputQuantity, props.price, props.name);
    } else {
      console.log("Cantidad no válida:", inputQuantity);  // Añadir console.log aquí
    }
  };

  return (
    <div className="card">
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      <p>
        <button onClick={handleAddToCart}>Add to Cart</button>
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
