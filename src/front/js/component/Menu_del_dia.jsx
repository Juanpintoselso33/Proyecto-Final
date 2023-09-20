import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import { productDataSalsas, Menu_dia } from "./PruebaData.js"


export const Menu_del_dia = () => {
    const { store, actions } = useContext(Context);

    console.log(Menu_dia)

    return (

        <div type="button" className="card Menu_dia" data-bs-toggle="modal" data-bs-target="#exampleModal"   >
            <div className="Img_MenuD"> <img src={Menu_dia.imageurl} alt="" /></div>
            <div className="Title">Menu del dia</div>
            <div className="Precio_MenuD">{Menu_dia.price}</div>
            <div className="Nombre_MenuD">{Menu_dia.name}</div>


        </div>

    );
};
