import React from 'react';
import axios from 'axios';
import { CartStore } from '../component/cartStore.js';


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			/* ----------<productos>--------------- */




			productos: [],
			carrito: [],
			isAuthenticated: false,
			token: null,




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
					let response = await fetch(process.env.BACKEND_URL + "/api/products");
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
					const response = await axios.post(process.env.BACKEND_URL + '/api/register', formData);

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
					const response = await axios.post(process.env.BACKEND_URL + '/api/products', productData);
					if (response.status === 200 || response.status === 201) {
						console.log('Producto agregado exitosamente:', response.data);
					} else {
						console.log('Error al agregar el producto:', response);
					}
				} catch (error) {
					console.error('Hubo un problema con la petición:', error);
				}
			},

			agregarAlCarrito: (producto) => {
				const store = getStore();
				const productoExistente = store.carrito.find(item => item.id === producto.id);
				if (productoExistente) {
					productoExistente.cantidad += 1;
				} else {
					producto.cantidad = 1;
					setStore({ carrito: [...store.carrito, producto] });
				}
			},

			eliminarDelCarrito: (productoId) => {
				const store = getStore();
				const nuevoCarrito = store.carrito.filter(item => item.id !== productoId);
				setStore({ carrito: nuevoCarrito });
			},

			initializeAuth: () => {
				const token = localStorage.getItem("token");
				const email = localStorage.getItem("email");
				const userId = localStorage.getItem("userId");  // Recuperar la ID del usuario

				if (token && email && userId) {
					setStore({ isAuthenticated: true, token, email, userId });  // Usar la ID del usuario
				}
			},
			login: async (email, password) => {
				try {

					const response = await axios.post(process.env.BACKEND_URL + '/api/login', {
						email,
						password
					});

					const userData = response.data;

					if (userData && userData.id) {
						localStorage.setItem("userId", userData.id.toString());
					} else {
						throw new Error("User ID not found in the response");
					}

					localStorage.setItem("token", userData.access_token);
					localStorage.setItem("email", email);

					// Actualizar el estado global
					setStore({
						isAuthenticated: true,
						token: userData.access_token,
						email,
						userId: userData.id
					});

					return true;
				} catch (error) {
					console.log("Error during login:", error);
					return false;
				}
			},

			logout: () => {
				console.log("Ejecutando función logout");
				localStorage.removeItem("token");
				localStorage.removeItem("email");
				setStore({ isAuthenticated: false, token: null, email: null });
				CartStore.clearCart(); // Limpia el carrito
			},
			createOrder: async () => {
				try {
					const store = getStore();
					const userId = store.userId;

					if (!userId) {
						throw new Error("User ID is undefined");
					}

					const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

					if (!cartFromLocalStorage || cartFromLocalStorage.length === 0) {
						console.log("El carrito está vacío. No se puede crear la orden.");
						return;
					}
					const items = cartFromLocalStorage.map(product => ({
						product_id: product.product_id,
						quantity: product.quantity
					}));

					const payload = {
						items,
					};

					const url = `${process.env.BACKEND_URL}api/user/${userId}/add_order`;
					console.log("Sending payload:", payload);
					console.log("URL de la solicitud POST:", url);

					const response = await axios.post(url, payload, {
						headers: {
							'Content-Type': 'application/json',
						}
					});

					const data = response.data;

					if (data.success) {
						console.log('Order created:', data.order);
						localStorage.setItem("cart", JSON.stringify([]));
					} else {
						console.log('Order creation failed:', data.message);
					}
				} catch (error) {
					console.log('An error occurred:', error);
				}
			},
			
































































































		} //FIN DE ACTIONS
	};
};

export default getState;
