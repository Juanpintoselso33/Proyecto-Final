import { Context } from "../store/appContext";
import React, { useState, useEffect, useContext } from "react";

export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const productDataSalsas = [
    {
        id: 1,
        //   imageurl:
        //     "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Kepchup",
        price: "$19.99",
        //   description: "Some text about the product..",
    },
    {
        id: 2,
        // imageurl:
        // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        name: "Mayonesa",
        price: "$21.99",
        // description: "Some text about the product..",
    },
    {
        id: 3,
        // imageurl:
        // "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Moztasa",
        price: "$99.99",
        // description: "Some text about the product..",
    },
    {
        id: 4,
        // imageurl:
        // "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Especialidad",
        price: "$14.99",
        // description: "Some text about the product..",
    },
    {
        id: 5,
        // imageurl:
        // "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Picantina",
        price: "$38.99",
        // description: "Some text about the product..",
    },
    {
        id: 6,
        // imageurl:
        // "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Picantina",
        price: "$38.99",
        // description: "Some text about the product..",
    },
    {
        id: 7,
        // imageurl:
        // "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Picantina",
        price: "$38.99",
        // description: "Some text about the product..",
    },

];




export const CardHamburguesas1 = () => {
    const { store, actions } = useContext(Context);

    return (
        store.modalData.categoria === "H" || "M" ?

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

            : <div>none</div>

    )
};


