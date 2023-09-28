import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
// import 'react-multi-carousel/lib/styles.css';
// import "../../styles/Stylecard.css";
// import InputRange from 'react-input-range';

import "./App.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Pruebas = (props) => {
    const { store, actions } = useContext(Context);
    const [valor, setValor] = useState(1);
    const [pepeaa, setPepeaa] = useState();  // Usamos el estado de React para manejar la cantidad


    function sumarPro() {
        setValor(valor + 1);
    }

    function restarPro() {
        if (valor > 1) {
            setValor(valor - 1);
        }
    }

    const pepit = props.extras
    var mono = []
    for (let i = 0; i < pepit.length; i++) {
        mono.push(pepit[i].name)
        // mono.push([i]);
        // console.log(mono)

    }


    const removeFromCart = (order_id) => {
        actions.removeFromCart(order_id);
        setPepeaa(order_id)
    };



    return (
        <div className="col-12  producto_indi">
            <div className="row  home_dentro">
                <div className="col-12">
                    <div className="row  pepe2  ">
                        <div className="col-4 imagenP">
                            <img src="https://th.bing.com/th/id/R.033c8f01fbb84af4c5a55a3cbac42404?rik=%2bib7SrOYugiI%2bg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-61BeHL1BdSo%2fTyKUcPwqfOI%2fAAAAAAAAAFA%2fr5X62fe8dRk%2fs1600%2fhamburguesa2.jpg&ehk=ro3LnT%2fFb%2fnjUfTdHupjmVvqBxsYOoorcmQnYdpuXt8%3d&risl=&pid=ImgRaw&r=0" alt="" />
                        </div>
                        <div className="col-8 d-flex padrNom_des">
                            <div className="row pequeño__iz">
                                <div className="col-12 arriba_M">
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="nom_des">
                                                <div className="col-12 Titulo_Pr">
                                                    {props.name}
                                                </div >
                                                <div className="col-12 extras_M">
                                                    {mono.join()}
                                                </div >
                                            </div>
                                        </div>
                                        <div className="col-3 contenedor_basura" onClick={() => removeFromCart(props.order_id)}>
                                            <div className="col-12 basura">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                </svg>
                                            </div >
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 abajo_M">
                                    <div className="row input_M">
                                        <div className="col-6">
                                            {/* <div className="container">

                                                <div className="row prueba">
                                                    <div className="col-12 wrapper">
                                                        Cantidad : {props.quantity}
                                                    </div>
                                                    <div className="col-12 wrapper">
                                                        Precio unitario : {props.price}
                                                    </div>
                                                </div>


                                            </div> */}
                                        </div>
                                        <div className="col-6 precio_M">
                                            <div className="preciosito">
                                                <strong>$ {props.cost}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    );
};


Pruebas.propTypes = {
    order_id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    extras: PropTypes.array,
    cost: PropTypes.number,
    quantity: PropTypes.number,
    totalCost: PropTypes.number
}
export default Pruebas;