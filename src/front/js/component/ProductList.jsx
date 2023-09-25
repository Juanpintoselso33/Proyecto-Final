import React from "react";
import PropTypes from "prop-types";
import Product from "./Product.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/Stylecard.css";

export const ProductList = ({ products, category }) => {
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
  ? products.filter((product) => product.itspromo)
  : products.filter((product) => product.category === category);

  return (
    <div className="home">
      <div className="App apapa">
        <h1>{category}</h1>
        <Carousel responsive={responsive}>
          {filteredProducts.map((product, index) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              url={product.img_url}
              price={product.cost}
              description={product.description}
              category={product.category}
            />
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
