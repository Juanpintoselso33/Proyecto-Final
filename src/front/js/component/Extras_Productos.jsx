import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import "../../styles/modal.css"
import { useNavigate } from "react-router-dom";

export const Extras_prod = () => {
    const { store, actions } = useContext(Context);
    const dataDetalle = store.modalData;
    const navigate = useNavigate();
    const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

    // Estado para almacenar extras filtrados y clasificados
    const [extrasFiltrados, setExtrasFiltrados] = useState([]);
    const [extrasPorTipo, setExtrasPorTipo] = useState({});

    const [valor, setValor] = useState(1);

    // Primer useEffect para cargar y filtrar extras
    useEffect(() => {
        if (dataDetalle != '') { // Comprobamos si dataDetalle está definido
            console.log("dataDetalle está definido, useEffect se está ejecutando");
            console.log(dataDetalle);

            const extrasAlmacenados = localStorage.getItem('extras');
            console.log("Extras almacenados:", extrasAlmacenados);

            if (extrasAlmacenados) {
                const extrasJSON = JSON.parse(extrasAlmacenados);
                console.log("Extras JSON:", extrasJSON);

                const extrasFiltrados = extrasJSON.filter(extra => extra.categories.includes(dataDetalle.categoria));
                console.log("Extras filtrados:", extrasFiltrados);

                setExtrasFiltrados(extrasFiltrados);

                const extrasPorTipo = {};
                extrasFiltrados.forEach(extra => {
                    if (!extrasPorTipo[extra.type]) {
                        extrasPorTipo[extra.type] = [];
                    }
                    extrasPorTipo[extra.type].push(extra);
                });

                console.log("Extras por tipo:", extrasPorTipo);
                setExtrasPorTipo(extrasPorTipo);
            }
        } else {
            console.log("dataDetalle está undefined");
        }
    }, [dataDetalle]); // Añadimos dataDetalle como dependencia para que useEffect se ejecute cuando dataDetalle cambie


    function sumarPro() {
        setValor(valor + 1);
    }

    function restarPro() {
        if (valor > 1) {
            setValor(valor - 1);
        }
    }

    const handleAddToCart = (extrasSeleccionados) => {
        if (valor > 0) {
            console.log("Precio mandado" + dataDetalle.price,)
            actions.addToCart(dataDetalle.id, valor, dataDetalle.price, dataDetalle.name, extrasSeleccionados);
            actions.limpiarExtrasSeleccionados();
        } else {
            console.log("Cantidad no válida:", valor);
        }
    };

    const manejarCambioExtra = (e, extra) => {
        let nuevosExtras = [...store.extrasSeleccionados];
        if (e.target.checked) {
            nuevosExtras.push(extra);
        } else {
            nuevosExtras = nuevosExtras.filter(item => item.id !== extra.id);
        }
        actions.actualizarExtras(nuevosExtras);
        setExtrasSeleccionados(nuevosExtras);
    };

    function mover_carrito() {
        navigate("/cart")
    }

    return (
        <div>
            <div className="modal fade pruebahome" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog pepesq1">
                    <div className="modal-content pruebasss">
                        <div className="modal-header header_Mod">
                            <div className="row w-100 sub_header">
                                <div className="nombre_modal">
                                    <strong>{dataDetalle.name} </strong>
                                </div>
                                {/* <div className="col-6">
                                </div> */}
                                <div className="col-2 text-end div_boton_x">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body contenedorImg_Data">
                            <div className="row img_y_extras">
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
                                        {Object.keys(extrasPorTipo).map((tipoExtra, index) => (
                                            <section className="layout" key={index}>
                                                <div className="titulos_tipo">
                                                    <div>
                                                        <strong>{tipoExtra}</strong>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <ul className="Lista_Agregados">
                                                        {extrasPorTipo[tipoExtra].map((extra, extraIndex) => (
                                                            <div className="listas border-top" key={extraIndex}>
                                                                <div className="col Elemento_del_UL" key={extraIndex}>
                                                                    {extra.name}
                                                                    <br />
                                                                    ${extra.price}
                                                                </div>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input border border-dark"
                                                                        onChange={(e) => manejarCambioExtra(e, extra)}
                                                                        type="checkbox"
                                                                        value=""
                                                                        id="flexCheckDefault"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </section>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer pruebaas">
                            <div className="row w-100">
                                <div className="col-12 CN_P1">
                                    <div className=" text-end align-self-center">
                                        <i
                                            className="fas fa-minus text-secondary"
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '2rem',
                                                transition: 'font-size 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.fontSize = '2.2rem'}
                                            onMouseOut={(e) => e.target.style.fontSize = '2rem'}
                                            onMouseDown={(e) => e.target.style.fontSize = '2.4rem'}
                                            onMouseUp={(e) => e.target.style.fontSize = '2rem'}
                                            onClick={restarPro}
                                        ></i>
                                        <span
                                            className="text-secondary align-self-center mx-2"
                                            style={{ fontSize: '3rem' }}
                                        >
                                            {valor}
                                        </span>
                                        <i
                                            className="fas fa-plus text-secondary"
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '2rem',
                                                transition: 'font-size 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.fontSize = '2.2rem'}
                                            onMouseOut={(e) => e.target.style.fontSize = '2rem'}
                                            onMouseDown={(e) => e.target.style.fontSize = '2.4rem'}
                                            onMouseUp={(e) => e.target.style.fontSize = '2rem'}
                                            onClick={sumarPro}
                                        ></i>
                                    </div>
                                </div>
                                <div className="col-12 CN_P2">
                                    {/* <div className="row text-end"> */}
                                    <div className="c3po1">
                                        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal" onClick={() => handleAddToCart(store.extrasSeleccionados)}>Agregar y seguir comprando</button>
                                    </div>
                                    <div className=" c3po2">
                                        <button type="button" className="btn btn-secondary" onClick={() => { handleAddToCart(store.extrasSeleccionados); mover_carrito(); }} data-bs-dismiss="modal">Agregar e ir a pagar</button>
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default Extras_prod;


