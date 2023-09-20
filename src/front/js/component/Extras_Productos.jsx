import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import PropTypes from "prop-types";
import { productDataSalsas } from "./PruebaData.js"


export const Extras_prod = (props) => {
    const { store, actions } = useContext(Context);
    const dataDetalle = store.modalData




    return (
        <div>

            <div className="modal fade pruebahome" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog pepesq1">
                    <div className="modal-content pruebasss">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"> <strong> {dataDetalle.name}</strong></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body contenedorImg_Data">
                            {/* <div className="c1">
                                <img className="imagenDetalle" src="https://th.bing.com/th/id/R.b0413de9114bf291db0398ec898a8b47?rik=EpGjHxR4Kqr%2b5g&pid=ImgRaw&r=0" alt="" />

                            </div> */}

                            <div className="row">
                                <div className="col div_img_comida">
                                    <img className="imagenDetalle" src="https://th.bing.com/th/id/R.b0413de9114bf291db0398ec898a8b47?rik=EpGjHxR4Kqr%2b5g&pid=ImgRaw&r=0" alt="" />
                                </div>
                                <div className="col DetallesAgregados">



                                    <div className="c2_1">
                                        <div className="c2_conjunto">
                                            <div className="c2_1_1_Precio">
                                                <strong>{"$" + dataDetalle.price}</strong>
                                            </div>

                                            <div className="c2_1_1_Descripcion">
                                                {dataDetalle.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="envo">



                                        {store.modalData.categoria === "H" || "M" || "C" || "P" ?
                                            <div>
                                                <section className="layout">
                                                    <div className=" titulos_tipo">
                                                        <div><strong>Salsas extras</strong></div>
                                                        <div>Selecciones 2 maximo</div>

                                                    </div>
                                                    <div className="">
                                                        <ul className="Lista_Agregados  ">



                                                            {productDataSalsas.map((item, index) => {
                                                                return (
                                                                    <div className="listas border-top" key={index}>
                                                                        <div className="col Elemento_del_UL" key={index}>
                                                                            {item.name}
                                                                            <br />
                                                                            {item.price}
                                                                        </div>


                                                                        <div className="form-check">
                                                                            <input className="form-check-input border border-dark" type="checkbox" value="" id="flexCheckDefault" />

                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>

                                                </section>

                                                <section className="layout ">
                                                    <div className=" titulos_tipo">
                                                        <div><strong>Bebida?</strong></div>
                                                        <div>Seleccione una bebida</div>

                                                    </div>
                                                    <div className="">
                                                        <ul className="Lista_Agregados  ">
                                                            {productDataSalsas.map((item, index) => {
                                                                return (
                                                                    <div className="listas border-top" key={index}>
                                                                        <div className="col Elemento_del_UL" key={index}>
                                                                            {item.name}
                                                                            <br />
                                                                            {item.price}
                                                                        </div>


                                                                        <div className="form-check">
                                                                            <input className="form-check-input border border-dark" type="checkbox" value="" id="flexCheckDefault" />

                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </section>
                                            </div>

                                            : store.modalData.categoria === "B" ?
                                                <div>none</div> : <div>no se</div>

                                        }






                                    </div>




                                </div>
                            </div>



                        </div>
                        <div className="modal-footer pruebaas">
                            <div className="wrapper">
                                <span className="minus" onClick={() => restarPro()}>-</span>
                                <span className="num">1</span>
                                <span className="plus" onClick={() => sumarPro()}>+</span>
                            </div>
                            {/* <button onClick={handleAddToCart()}>Add to Cart</button> */}

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleAddToCart(valor)}> Agregar y seguir comprando</button>
                            <button type="button" className="btn btn-primary " onClick={() => { handleAddToCart(valor), mover_carrito() }} data-bs-dismiss="modal" >Agregar e ir a pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




Extras_prod.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    categoria: PropTypes.string,
};

export default Extras_prod;


