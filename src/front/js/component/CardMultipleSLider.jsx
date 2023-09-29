import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import { array } from "prop-types";


export const CardMultiple = () => {
    const { store, actions } = useContext(Context);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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
        actions.obtenerAllProducts()

    }, [])

 
    return (
        <div className="Demo">
            <div className="home">
                <div className="App" >
                    <h1>Hamburguesas</h1>
                    <Carousel responsive={responsive}>
                        {productHambur}
                    </Carousel>
                </div>
            </div>
            <div className="home">
                <div className="App" >
                    <h1>Milanesas</h1>
                    <Carousel responsive={responsive}>
                        {productMila}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};