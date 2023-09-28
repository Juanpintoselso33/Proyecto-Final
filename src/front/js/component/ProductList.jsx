import React from "react";
import PropTypes from "prop-types";
import Product from "./Product.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/Stylecard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const ProductList = ({ products, category }) => {

  const CustomRightArrow = ({ onClick }) => {
    return (
      <div className="custom-arrow right" onMouseOver={onClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <div className="custom-arrow left" onMouseOver={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    );
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 5000, min: 4000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Filtrar productos por categoría  
  const filteredProducts = category === "Promociones"
    ? products.filter((product) => product.its_promo)
    : products.filter((product) => product.category === category);

    return (
      <div className="bg-light py-4">
        <div className="App apapa">
          <h1 className="text-center text-dark display-4">{category}</h1>
          <Carousel
            responsive={responsive}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="border rounded text-center shadow-sm d-flex align-items-center justify-content-center mb-4"
                style={{
                  padding: '15px',
                  minHeight: '400px',                
                }}>
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  url={product.img_url}
                  price={product.cost}
                  description={product.description}
                  category={product.category}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
};


ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img_url: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired, // Agregar categoría a los productos
    })
  ).isRequired,
  category: PropTypes.string.isRequired, // Prop para la categoría
};

export default ProductList;
