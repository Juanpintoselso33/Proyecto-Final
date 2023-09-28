import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";

export default function ItemCarrusel(props) {
    const { actions } = useContext(Context);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const backgroundStyle = {
        backgroundImage: `url(${props.img_urli})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(5px)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: '-1'
    };

    const enviarMensaje = () => {
        const data = {
            idx: props.idProducto,
            urlx: props.img_urli,
            namex: props.namei,
            pricex: props.costi,
            descriptionx: props.descriptioni,
            categoriax: props.categoria
        };
        actions.DataModalDetalle(data);
    };

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className={`carousel-item ${props.activei} d-flex align-items-center position-relative`} style={{ width: '100%', height: '100%' }}>
            <div style={backgroundStyle}></div>
    
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-6">
                        <img src={props.img_urli} className="img-fluid rounded shadow" alt={props.namei} />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                        {props.its_daily_menu &&
                            <div className="mb-3" style={{
                                background: 'rgba(255,255,255,0.8)',
                                color: 'black',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                zIndex: 2,
                                opacity: 0.7  // Añadido el mismo valor de opacity
                            }}>
                                <h2>Menú del Día</h2>
                            </div>
                        }
                        <div
                            className="bg-light p-5 rounded shadow text-center wt-auto"
                            style={{
                                opacity: 0.7,
                                transform: isPressed ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.5s ease'
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => enviarMensaje()}
                        >
                            <h5>{props.namei}</h5>
                            <p>{props.descriptioni}</p>
                            <h3>${props.costi}</h3>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
    );
    
}


ItemCarrusel.propTypes = {
    idProducto: PropTypes.number,
    activei: PropTypes.string,
    img_urli: PropTypes.string,
    namei: PropTypes.string,
    costi: PropTypes.number,
    descriptioni: PropTypes.string,
    categoria: PropTypes.string,
    its_daily_menu: PropTypes.bool
}
