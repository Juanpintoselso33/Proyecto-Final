import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";






export const CardPescado = () => {
    const { store, actions } = useContext(Context);
    const [arrayPescado, setArrayPescado] = useState([])



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

    //guardo solo los productos con categoria "H" => hamburguesas
    for (let i = 0; i < store.productos.length; i++) {
        if (store.productos[i].category === "PZ") {
            arrayPescado.push(store.productos[i])
        }


    }

    const productPescado = arrayPescado.map((item, index) => (
        <Product key={index}
            name={item.name}
            url={item.img_url}
            price={item.cost}
            description={item.description}
        />
    ));



    return (

        <div className="home">
            <div className="App" >
                <h1>Pescado</h1>
                <Carousel responsive={responsive}>
                    {productPescado}
                </Carousel>
            </div>
        </div>




    );



};