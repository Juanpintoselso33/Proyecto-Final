import React from 'react';
import axios from 'axios';


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			/* ----------<productos>--------------- */




			productos: [],




			/* ----------</productos>--------------- */










			message: null,

			planetas: [],

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (email, password) => {
				console.log("fnciona")
				try {
					let data = await axios.post('https://animated-telegram-54x4vxwwxq6hpgg9-3001.app.github.dev/api/login', {
						"email": email,
						"password": password
					})
					console.log(data);
					//Guardar en el navegador el token
					localStorage.setItem("token", data.data.access_token);
					setStore({ isAuthenticated: true }); // Actualiza el estado a true

					return true;
				}
				catch (error) {
					if (error.response.status === 404) {
						alert(error.response.data.msg)
					}

				}

			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			/* -----------------Productos-----------------*/
			obtenerAllProducts: async function () {
				try {
					let response = await fetch("https://cautious-space-waffle-v6vw5vw54j73w7q6-3001.app.github.dev/api/products");
					let data = await response.json();
					setStore({ productos: data });

				}

				catch (error) {
					console.log(error);

				}
			},
			/* -----------------Registro-----------------*/

			//Funcion para dar de alta registros
			registerUser: async (formData) => {
				try {
					const response = await axios.post('https://animated-telegram-54x4vxwwxq6hpgg9-3001.app.github.dev/api/register', formData);

					if (response.status === 200 || response.status === 201) {
						console.log('Registro exitoso:', response.data);
						// Aquí puedes actualizar el estado o hacer otras acciones
					} else {
						console.log('Error en el registro:', response);
						console.log('Estado de la respuesta:', response.status);
						console.log('Cuerpo de la respuesta:', response.data);

						if (response.data.error) {
							alert(response.data.error); // Mostrar el mensaje de error al usuario
						}
					}
				} catch (error) {
					console.error('Hubo un problema con la petición:', error);
					if (error.response && error.response.data && error.response.data.error) {
						alert(error.response.data.error); // Mostrar el mensaje de error al usuario
					}
				}
			},

			addProduct: async (productData) => {
				try {
					const response = await axios.post('https://animated-telegram-54x4vxwwxq6hpgg9-3001.app.github.dev/api/products', productData);
					if (response.status === 200 || response.status === 201) {
						console.log('Producto agregado exitosamente:', response.data);
					} else {
						console.log('Error al agregar el producto:', response);
					}
				} catch (error) {
					console.error('Hubo un problema con la petición:', error);
				}
			}


































































































		} //FIN DE ACTIONS
	};
};

export default getState;
