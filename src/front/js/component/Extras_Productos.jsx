import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import PropTypes from "prop-types";
import { productDataSalsas, Tamaño_bebida, Guarniciones } from "./PruebaData.js"
import { CartStore } from './cartStore'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

export const Extras_prod = () => {
    const { store, actions } = useContext(Context);
    const dataDetalle = store.modalData
    const navigate = useNavigate();
    let num = document.querySelector(".num");
    const [arrayCardBebidas, setArrayCardBebidas] = useState([])
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

    useEffect(() => {
        const bebidas = store.productos.filter((producto) => producto.category === "B");
        setArrayCardBebidas(bebidas);
    }, [store.productos]);


    const handleAddToCart = (num, extrasSeleccionados) => {
        const inputQuantity = num;
        if (!isNaN(inputQuantity) && inputQuantity > 0) {
            console.log("Cantidad válida:", inputQuantity);  
            // Agregamos el parámetro extrasSeleccionados para pasarlo al carrito
            CartStore.addToCart(dataDetalle.id, inputQuantity, dataDetalle.price, dataDetalle.name, extrasSeleccionados);
            actions.limpiarExtrasSeleccionados();
        } else {
            console.log("Cantidad no válida:", inputQuantity);  
        }
    };

    const manejarCambioExtra = (e, extra) => {       
        let nuevosExtras = [...store.extrasSeleccionados]; // Hacemos una copia del estado actual    
        if (e.target.checked) {
            nuevosExtras.push(extra); // Añadimos el extra al array
        } else {
            nuevosExtras = nuevosExtras.filter(item => item.id !== extra.id); // Eliminamos el extra del array
        }    
        // Llamamos a la acción para actualizar el estado en el store
        actions.actualizarExtras(nuevosExtras);
    };


    function mover_carrito() {
        navigate("/cart")
    }

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
                                    <img className="imagenDetalle" src={dataDetalle.url} alt="" />
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
                                        {dataDetalle.categoria == "H" || dataDetalle.categoria == "M" || dataDetalle.categoria == "C" || dataDetalle.categoria == "P" ?
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
                                                                            <input className="form-check-input border border-dark" onChange={(e) => manejarCambioExtra(e, productDataSalsas[item.id - 1])}  type="checkbox"  value="" id="flexCheckDefault" />
                                                                        </div>
                                                                    </div>)
                                                            })}
                                                        </ul>
                                                    </div>
                                                </section>
                                                <section className="layout">
                                                    <div className=" titulos_tipo">
                                                        <div><strong>Guarniciones</strong></div>
                                                        <div>Selecciones 5 opciones maximo</div>
                                                    </div>
                                                    <div className="">
                                                        <ul className="Lista_Agregados  ">
                                                            {Guarniciones.map((item, index) => {
                                                                return (
                                                                    <div className="listas border-top" key={index}>
                                                                        <div className="col Elemento_del_UL" key={index}>
                                                                            {item.name}
                                                                            <br />
                                                                            {item.price}
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input border border-dark" onChange={(e) => manejarCambioExtra(e, Guarniciones[item.id - 1])} type="checkbox" value="" id="flexCheckDefault" />
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
                                                            {arrayCardBebidas.map((item, index) => {
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

                                            : dataDetalle.categoria == "B"
                                                ? <section className="layout">
                                                    <div className=" titulos_tipo">
                                                        <div><strong>Tamaño</strong></div>
                                                        <div>Tamaño de la bebida</div>
                                                    </div>
                                                    <div className="">
                                                        <ul className="Lista_Agregados  ">
                                                            {Tamaño_bebida.map((item, index) => {
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
                                                </section> : <div>ERROR: No se encuentran extras</div>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleAddToCart(valor, store.extrasSeleccionados)}> Agregar y seguir comprando</button>
                            <button type="button" className="btn btn-primary " onClick={() => { handleAddToCart(valor, store.extrasSeleccionados), mover_carrito() }} data-bs-dismiss="modal" >Agregar e ir a pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};






export default Extras_prod;


