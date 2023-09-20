import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardHamburguesas } from "../component/SecHamburguesa.jsx"
import { CardMilanesas } from "../component/SecMilanesa.jsx"
import { CardPescado } from "../component/SecPescado.jsx"
import { CardPancho } from "../component/SecPancho.jsx";
import { CardChivito } from "../component/SecChivito.jsx"
import { CardPlato } from "../component/SecPlato.jsx"
import { CardVianda } from "../component/SecVianda.jsx"
import { CardBebida } from "../component/SecBebidas.jsx"
import { CardEspecial } from "../component/SecEspecial.jsx"
import { CardPromos } from "../component/SecPromos.jsx"
import { Navbar } from "../component/navbar.js"
import { CarruselInicio } from "../component/Carrusel_inicio.jsx"
import { Extras_prod } from "../component/Extras_Productos.jsx"


export const Home = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.obtenerAllProducts();

	}, []);

	return (
		<div className="text-center mt-5">
			<Navbar />
			<Extras_prod />
			<div className="div1">
				<CarruselInicio />
			</div>
			<div className="div2">

				<CardHamburguesas />
				<CardMilanesas />
				<CardPescado />
				<CardPancho />
				<CardChivito />
				<CardVianda />
				<CardPlato />
				<CardBebida />
				<CardEspecial />
			</div>
		</div>
	);
};
