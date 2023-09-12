import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {CardHamburguesas} from "../component/SecHamburguesa.jsx"
import {CardMilanesas} from "../component/SecMilanesa.jsx"
import {CardPescado} from "../component/SecPescado.jsx"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<CardHamburguesas/>
			<CardMilanesas/>
			<CardPescado/>
		</div>
	);
};
