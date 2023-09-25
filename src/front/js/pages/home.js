import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js"
import { CarruselInicio } from "../component/Carrusel_inicio.jsx"
import { Extras_prod } from "../component/Extras_Productos.jsx"
import {ProductList} from "../component/ProductList.jsx"; 



export const Home = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.obtenerAllProducts();
	}, []);

	return (
		<div className="text-center mt-5">
			<div className="NANA">
				<Navbar />
			</div>
			<Extras_prod />
			<div className="contenido">
				{/* <div className="div1">
					<CarruselInicio />
				</div> */}
				<div className="div2">
					<ProductList category="Promociones" products={store.productos} />
					<ProductList category="Hamburguesas" products={store.productos} />
					<ProductList category="Milanesas" products={store.productos} />				
				</div>
			</div>
		</div>
	);
};
