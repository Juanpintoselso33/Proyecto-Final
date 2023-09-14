import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import PropTypes from "prop-types";







export default function ItemCarrusel(props) {
    const { store, actions } = useContext(Context);
    const [arrayCardBebidas, setArrayCardBebidas] = useState([])



    useEffect(() => {
        actions.obtenerAllProducts()

    }, [])




    const Fila_1 = { filter: "blur(5px)", transition: "filter .5s ease" }

    return (


        <div className="carousel-item ">
            <img src={props.img_urli} style={Fila_1} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block contenedor ">

                <div className="papa1">
                    <div className=" carousel-inner img_producto">
                        <img src={props.img_urli} className="" alt="..." />
                    </div>

                    <div className=" carousel-inner detalle_Producto">
                        <div className="titulo1"><strong>src={props.namei}</strong></div>
                        <div>{props.costi}</div>
                        <div>
                            {props.descriptioni}
                        </div>
                    </div>
                </div>

            </div>
        </div>




    );



};

ItemCarrusel.propTypes = {
    img_urli: PropTypes.string,
    namei: PropTypes.string,
    costi: PropTypes.number,
    descriptioni: PropTypes.string,

};