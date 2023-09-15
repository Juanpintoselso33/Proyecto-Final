import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import PropTypes from 'prop-types';

export const CardHamburguesas = (props) => {
    const { store, actions } = useContext(Context);
    const [arrayHambur, setArrayHambur] = useState([]);

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
        const hamburguesas = store.productos.filter((producto) => producto.category === "H");
        setArrayHambur(hamburguesas);
    }, [store.productos]);

    const productHambur = arrayHambur.map((item, index) => (
        <Product key={index}
            id={item.id}
            name={item.name}
            url={item.img_url}
            price={item.cost}
            description={item.description}
        />
    ));

    return (
        <div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            < div className="home" >
                <div className="App">
                    <h1>Hamburguesas</h1>
                    <Carousel responsive={responsive}>
                        {productHambur}
                    </Carousel>
                </div>
            </div >
        </div>
    );
};
CardHamburguesas.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};
