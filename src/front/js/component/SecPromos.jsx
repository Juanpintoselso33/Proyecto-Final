import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import PropTypes from "prop-types";
import { productDataSalsas } from "./PruebaData.js"
import { CartStore } from './cartStore'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";



export const CardPromos = () => {
    const { store, actions } = useContext(Context);
    const [arrayPromos, setArrayPromos] = useState([]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 5000, min: 4000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        actions.obtenerAllProducts();
    }, []);

    useEffect(() => {
        const promos = store.productos.filter((producto) => producto.promo === true);

        setArrayPromos(promos);
    }, [store.productos]);

    const productPromos = arrayPromos.map((item, index) => (
        <Product key={index}
            id={item.id}
            name={item.name}
            url={item.img_url}
            price={item.cost}
            description={item.description}
            categoria={item.category}
        />
    ));

    return (
        <div className="home">
            <div className="App">
                <h1>Promociones</h1>
                <Carousel responsive={responsive}>
                    {productPromos}
                </Carousel>
            </div>
        </div>
    );
};
