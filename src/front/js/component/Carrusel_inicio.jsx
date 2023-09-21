import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import { array } from "prop-types";
import ItemCarrusel from "./ItemCarrusel_inicio.jsx"





export const CarruselInicio = () => {
    const { store, actions } = useContext(Context);
    // const [arrayItemsCarrusel, setArrayItemsCarrusel] = useState([])
    // const [prueba22, setPrueba22] = useState("")
    const ArrayProductos = []





    useEffect(() => {
        actions.obtenerAllProducts()


    }, [])





    const Fila_1 = { filter: "blur(1px)", transition: "filter .5s ease" }



    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min) + min);
    // }

    const largo = store.productos.length

    //guardo solo los productos con categoria "H" => hamburguesas
    for (let i = 0; i < store.productos.length; i++) {
        if ((store.productos[i].category === "M") | (store.productos[i].category === "H")) {
            ArrayProductos.push(store.productos[i])
        }


    }

    // function cargarlistaPr() {



    //     for (const i = 0; i < arrayMilane.length; i++) {
    //         let pr = false
    //         const random = getRandomInt(1, largo)
    //         if (random === arrayMilane[i]) {
    //             random = getRandomInt(1, largo)

    //         } else {
    //             arrayMilane.push(random)


    //         }

    //         console.log(pr)
    //         console.log(arrayMilane)
    //     }

    // }


    //     <ItemCarrusel key={index}
    //     namei={item.name}
    //     img_urli={item.img_url}
    //     costi={item.cost}
    //     descriptioni={item.description}
    // />
    // ))

    const ItemsdelCarrusel = ArrayProductos.map((item, index) => (
        <ItemCarrusel key={index}
            namei={item.name}
            img_urli={item.img_url}
            costi={item.cost}
            descriptioni={item.description}
        />
    ))

    //     index == 0 ?
    //         <ItemCarrusel key={index} activei={"carousel-item active"} namei={item.name} img_urli={item.img_url} costi={item.cost} descriptioni={item.description}></ItemCarrusel> :
    //         <ItemCarrusel key={index} activei={"carousel-item"} namei={item.name} img_urli={item.img_url} costi={item.cost} descriptioni={item.description}></ItemCarrusel>

    // ))





    // arrayEspeciales.push(store.productos[i])


    // {
    //     ArrayProductos.map((item, index) => {
    //         return (
    //             <div key={index}>
    //                 <ItemCarrusel key={index} namei={item.name} img_urli={item.img_url} costi={item.cost} descriptioni={item.description}></ItemCarrusel>
    //             </div>
    //         )
    //     })
    // }

    // {
    //     ArrayProductos.map((item, index) => {
    //         let isFirstItem = true

    //         if (index === 0) {
    //             const itemClass = isFirstItem ? 'active' : ' ';
    //             isFirstItem = false;
    //         }
    //         return (
    //             <div key={index}>
    //                 <ItemCarrusel key={index} activei={"${itemClass}"} namei={item.name} img_urli={item.img_url} costi={item.cost} descriptioni={item.description}></ItemCarrusel>
    //             </div>
    //         )

    //     })
    // }






    return (

        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner carrusel_Principal">
                <div className="carousel-item active">
                    <img src="https://th.bing.com/th/id/R.d8114ad8d46914dd87614f78a63cf652?rik=C8xbyv%2f1PmDxgg&riu=http%3a%2f%2ffrescados.files.wordpress.com%2f2012%2f05%2fhamburguesa-de-res.jpg&ehk=XHZfIVmSjX2uBGugX%2b2j7v%2bFkz7MfKs9AOagUHBScbw%3d&risl=1&pid=ImgRaw&r=0" className="d-block w-100" alt="..." />
                </div>

                {ArrayProductos.map((item, index) => {
                    return (

                        <ItemCarrusel key={index} activei={"carousel-item active"} namei={item.name} img_urli={item.img_url} costi={item.cost} descriptioni={item.description}></ItemCarrusel>

                    )
                })}


            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>


    );



};

// <div className="carousel-item active">
// <img src="https://thumbs.dreamstime.com/b/droge-deegwaren-met-tomaten-kruiden-en-kruiden-voor-tomatensaus-op-houten-achtergrond-hoogste-mening-82668112.jpg" style={Fila_1} className="d-block w-100" alt="..." />
// <div className="carousel-caption d-none d-md-block contenedor ">
//     <div className="papa1">
//         <div className=" carousel-inner img_producto">
//             <img src="https://th.bing.com/th/id/R.d8114ad8d46914dd87614f78a63cf652?rik=C8xbyv%2f1PmDxgg&riu=http%3a%2f%2ffrescados.files.wordpress.com%2f2012%2f05%2fhamburguesa-de-res.jpg&ehk=XHZfIVmSjX2uBGugX%2b2j7v%2bFkz7MfKs9AOagUHBScbw%3d&risl=1&pid=ImgRaw&r=0" className="" alt="..." />
//         </div>
//         <div className=" carousel-inner detalle_Producto">
//             <div className="titulo1"><strong>Chorizo al pan</strong></div>
//             <div>$140</div>
//             <div>
//                 -lechiga <br />
//                 -tomate
//             </div>
//         </div>
//     </div>
// </div>
// </div>
// <div className="carousel-item">
// <img src="https://thumbs.dreamstime.com/b/comida-italiana-e-ingredientes-crudos-en-fondo-de-madera-visi%C3%B3n-superior-104633027.jpg" className="d-block w-100" alt="..." />
// <div className="carousel-caption d-none d-md-block mb-5">
//     <h5>Second slide label</h5>
//     <p>Some representative placeholder content for the second slide.</p>
// </div>
// </div>
// <div className="carousel-item">
// <img src="https://st.depositphotos.com/2576363/4639/i/950/depositphotos_46392373-stock-photo-italian-food-background.jpg" className="d-block w-100" alt="..." />
// <div className="carousel-caption d-none d-md-block">
//     <h5>Third slide label</h5>
//     <p>Some representative placeholder content for the third slide.</p>
// </div>
// </div>