import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {CardHamburguesas} from "../component/SecHamburguesa.jsx"
import {CardMilanesas} from "../component/SecMilanesa.jsx"
import {CardPescado} from "../component/SecPescado.jsx"
import { CardPancho } from "../component/SecPancho.jsx";
import {CardChivito} from "../component/SecChivito.jsx"
import {CardPlato} from "../component/SecPlato.jsx"
import {CardVianda}from "../component/SecVianda.jsx"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<CardHamburguesas/>
			<CardMilanesas/>
			<CardPescado/>
			<CardPancho/>
			<CardChivito/>
			<CardVianda/>
		</div>
	);
};
