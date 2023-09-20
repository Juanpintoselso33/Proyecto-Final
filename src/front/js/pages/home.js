import React, { useContext } from "react";
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


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Navbar />
			<div className="div1">
				<CarruselInicio/>
			</div>
			<div className="div2">
				<CardHamburguesas/>
				<CardMilanesas/>
				<CardPromos/>
				{/* <CardPescado/>
				<CardPancho/>
				<CardChivito/>
				<CardVianda/>
				<CardPlato/>
				<CardBebida/>
				<CardEspecial/> */}
			</div>
		</div>
	);
};
