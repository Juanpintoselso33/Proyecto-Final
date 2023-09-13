import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {CardHamburguesas} from "../component/SecHamburguesa.jsx"
import {CardMilanesas} from "../component/SecMilanesa.jsx"
import {CardPescado} from "../component/SecPescado.jsx"
import { CardPancho } from "../component/SecPancho.jsx";
import {CardChivito} from "../component/SecChivito.jsx"
import {CardPlato} from "../component/SecPlato.jsx"
import {CardVianda} from "../component/SecVianda.jsx"
import {CardBebida} from "../component/SecBebidas.jsx"
import {CardEspecial} from "../component/SecEspecial.jsx"
import { Navbar} from "../component/navbar.js"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Navbar />
			<CardHamburguesas/>
			<CardMilanesas/>
			<CardPescado/>
			<CardPancho/>
			<CardChivito/>
			<CardVianda/>
			<CardPlato/>
			<CardBebida/>
			<CardEspecial/>
		</div>
	);
};
