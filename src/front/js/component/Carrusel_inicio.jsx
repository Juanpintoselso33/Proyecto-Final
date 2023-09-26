import React, { useState, useEffect } from 'react';
import ItemCarrusel from './ItemCarrusel_inicio.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CarruselInicio = () => {
    const [ArrayProductos, setArrayProductos] = useState([]);

    useEffect(() => {
        const productosAlmacenados = localStorage.getItem('productos');
        if (productosAlmacenados) {
            const productos = JSON.parse(productosAlmacenados);
            console.log("Productos desde localStorage:", productos);  // Para depurar
            const productosFiltrados = productos.filter(producto => producto.its_promo === true);
            console.log("Productos filtrados:", productosFiltrados);  // Para depurar
            setArrayProductos(productosFiltrados);    
            const myCarousel = document.getElementById('carouselExampleFade');
            new bootstrap.Carousel(myCarousel, {
                interval: 10000
            });
        }
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-11">
                    <div id="carouselExampleFade" className="carousel slide carousel-fade rounded shadow" 
                         data-bs-ride="carousel" 
                         data-bs-interval="10000" 
                         style={{borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <div className="carousel-inner carrusel_Principal">
                            {ArrayProductos.map((item, index) => (
                                <ItemCarrusel
                                    key={index}
                                    idProducto={item.id}
                                    activei={index === 0 ? "carousel-item active" : "carousel-item"}
                                    namei={item.name}
                                    img_urli={item.img_url}
                                    costi={item.cost}
                                    descriptioni={item.description}
                                    categoria= {item.category}
                                />
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" 
                                data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" 
                                data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};