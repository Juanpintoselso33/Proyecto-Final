import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import { array } from "prop-types";





export const CarruselInicio = () => {
    const { store, actions } = useContext(Context);
    const [arrayHambur, setArrayHambur] = useState([])
    const [arrayMilane, setArrayMilane] = useState([])


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
        if (store.productos[i].category === "H") {
            arrayHambur.push(store.productos[i])
        }


    }

    const productHambur = arrayHambur.map((item, index) => (
        <Product key={index}
            name={item.name}
            url={item.img_url}
            price={item.cost}
            description={item.description}
        />
    ));

    const productMila = arrayMilane.map((item, index) => (
        <Product key={index}
            name={item.name}
            url={item.img_url}
            price={item.cost}
            description={item.description}
        />
    ));



    return (

        <div className="CarruselInicio">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://st.depositphotos.com/2576363/4639/i/950/depositphotos_46392373-stock-photo-italian-food-background.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://thumbs.dreamstime.com/b/comida-italiana-e-ingredientes-crudos-en-fondo-de-madera-visi%C3%B3n-superior-104633027.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://thumbs.dreamstime.com/b/droge-deegwaren-met-tomaten-kruiden-en-kruiden-voor-tomatensaus-op-houten-achtergrond-hoogste-mening-82668112.jpg" class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>


    );



};