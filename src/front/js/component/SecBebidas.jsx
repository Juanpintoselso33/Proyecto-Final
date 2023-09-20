import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";




export const CardBebida = () => {
    const { store, actions } = useContext(Context);
    const [arrayCardBebidas, setArrayCardBebidas] = useState([])



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
        const bebidas = store.productos.filter((producto) => producto.category === "B");
        setArrayCardBebidas(bebidas);
    }, [store.productos]);



    return (

        <div className="home">
            <div className="App" >
                <h1>Bebidas</h1>
                <Carousel responsive={responsive}>
                    {arrayCardBebidas.map((item, index) => {
                        return (

                            <Product key={index}
                                id={item.id}
                                name={item.name}
                                url={item.img_url}
                                price={item.cost}
                                description={item.description}
                                categoria={item.category}
                            />

                        )
                    })}
                </Carousel>
            </div>
        </div>




    );



};