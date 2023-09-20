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


export const CardHamburguesas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [arrayHambur, setArrayHambur] = useState([]);
    const dataDetalle = store.modalData
    const Pruebas1122 = store.datosPrueba
    const [cantidadP, setcantidadP] = useState();
    let num = document.querySelector(".num");
    let pepe = document.querySelector(".num");

    let valor = 1




    function sumarPro() {

        valor++;

        num.innerText = valor



    }

    function restarPro() {

        if (valor > 1) {
            valor--;
            num.innerText = valor

        }
    }




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



    const handleAddToCart = (num) => {

        const inputQuantity = num;

        if (!isNaN(inputQuantity) && inputQuantity > 0) {
            console.log("Cantidad válida:", inputQuantity);  // Añadir console.log aquí
            CartStore.addToCart(dataDetalle.id, inputQuantity, dataDetalle.price, dataDetalle.name);
        } else {
            console.log("Cantidad no válida:", inputQuantity);  // Añadir console.log aquí
        }
    };

    useEffect(() => {
        actions.obtenerAllProducts();

    }, []);



    useEffect(() => {
        const hamburguesas = store.productos.filter((producto) => producto.category === "H");
        setArrayHambur(hamburguesas);
    }, [store.productos]);


    // const productHambur = arrayHambur.map((item, index) => (
    //     <Product key={index}
    //         id={item.id}
    //         name={item.name}
    //         url={item.img_url}
    //         price={item.cost}
    //         description={item.description}
    //         addmensaje={addmensaje}

    //     />
    // ));

    // const productSalsas = productDataSalsas.map((item, index) => (
    //     <div className="col" key={index}>{item.name}</div>
    // ));

    function mover_carrito() {
        navigate("/cart")
    }


    return (
        <div>

           



            < div className="home" >
                <div className="App apapa">
                    <h1>Hamburguesas</h1>
                    <Carousel responsive={responsive}>

                        {arrayHambur.map((item, index) => {
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
            </div >
        </div >
    );
};
