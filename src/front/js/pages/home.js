import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js"
import { CarruselInicio } from "../component/Carrusel_inicio.jsx"
import { Extras_prod } from "../component/Extras_Productos.jsx"
import { ProductListContainer } from "../component/ProductListContainer.jsx";



export const Home = () => {

	const { store, actions } = useContext(Context);
	const [seccionActiva, setSeccionActiva] = useState("Inicio"); // Puedes inicializarlo con el nombre de la sección que quieres que se muestre primero

	useEffect(() => {
		actions.obtenerAllProducts();
	}, []);

	return (
		<div className="text-center mt-5">
			<Extras_prod />
			<div className="NANA mb-5">
				<Navbar setSeccionActiva={setSeccionActiva} />
			</div>
			{seccionActiva === "Inicio" && (
				<div className="Inicio">
					<CarruselInicio />
				</div>
			)}
			{seccionActiva === "Catalogo" && (
				<div className="Catalogo">
					<ProductListContainer />					
				</div>
			)}
		</div>
	);
};
