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
    const [cantidadP, setcantidadP] = useState();
    let num = document.querySelector(".num");
    let pepe = document.querySelector(".num");

    let valor = 1


    console.log(cantidadP)

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

    const productSalsas = productDataSalsas.map((item, index) => (
        <div className="col" key={index}>{item.name}</div>
    ));

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


                                        <section className="layout ">
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
                                />

                            )
                        })}
                    </Carousel>
                </div>
            </div >
        </div >
    );
};
