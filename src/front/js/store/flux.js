import React from 'react';
import axios from 'axios';
import { CartStore } from '../component/cartStore.js';


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			/* ----------<productos>--------------- */

			isAdmin: false,
			datosPrueba: [],
			modalData: [],
			productos: [],
			extrasSeleccionados: [],
			isAuthenticated: false,
			token: null,




			/* ----------</productos>--------------- */

			message: null,

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

					console.log('Datos que se enviarán:', productData);
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

					// Verifica si el usuario es administrador
					const isAdmin = email === "admin@gmail.com" && password === "admin123";

					// Actualizar el estado global
					setStore({
						isAuthenticated: true,
						token: userData.access_token,
						email,
						userId: userData.id,
						isAdmin
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
				setStore({ isAdmin: false });
				CartStore.clearCart(); // Limpia el carrito
			},

			createOrder: async () => {
				try {
					const userId = localStorage.getItem("userId");

					if (!userId) {
						throw new Error("User ID is undefined");
					}

					CartStore.syncWithLocalStorage();  // Asegúrate de sincronizar antes de crear la orden
					const cartFromLocalStorage = CartStore.getCart(); // Usa el método getCart()

					console.log("Estado del carrito antes de crear la orden:", cartFromLocalStorage);

					if (!cartFromLocalStorage || cartFromLocalStorage.length === 0) {
						console.log("El carrito está vacío. No se puede crear la orden.");
						return;
					}

					const items = cartFromLocalStorage.map(item => ({
						product_id: item.product_id,
						quantity: item.quantity,
						extras: item.extras || []
					}));

					const payload = {
						items,
					};

					const url = `${process.env.BACKEND_URL}api/user/${userId}/add_order`;
					console.log("Enviando payload:", payload);
					console.log("URL de la solicitud POST:", url);

					const response = await axios.post(url, payload, {
						headers: {
							'Content-Type': 'application/json',
						}
					});

					const data = response.data;

					if (data.success) {
						console.log('Order created:', data.order);
						CartStore.clearCart(); // Limpia el carrito usando el método de CartStore
					} else {
						console.log('Order creation failed:', data.message);
					}
				} catch (error) {
					console.log('An error occurred:', error);
				}
			},


			actualizarExtras: nuevosExtras => {
				setStore({
					extrasSeleccionados: [...nuevosExtras] // Simplemente copiamos el nuevo array de extras al estado del store
				});
				console.log("Extras actualizados:", nuevosExtras);
			},


			limpiarExtrasSeleccionados: () => {
				setStore({
					extrasSeleccionados: []
				});
				console.log("Arreglo de extras limpiado");
			},


















			//Cargo datos para modal

			DataModalDetalle: (data) => {
				const store = getStore();
				const datosModal = [{}]

				setStore({
					modalData: {
						id: data.idx,
						url: data.urlx,
						name: data.namex,
						price: data.pricex,
						description: data.descriptionx,
						categoria: data.categoriax

					}
				});

			},



			Prueba1: (data) => {
				const store = getStore();
				const datosModal = []

				setStore({ datosPrueba: data });
				console.log(store.datosPrueba)
			},
























































































































			obtenerUsuarios: async () => {
				try {
				  const response = await axios.get(`${process.env.BACKEND_URL}/api/users`);
				  const usuarios = response.data;
				  setStore({ usuarios }); // Actualiza el estado con los usuarios obtenidos
				} catch (error) {
				  console.error('Error al obtener usuarios:', error);
				}
			  },

		

			  eliminarUsuario: async (userId) => {
				try {
				  // Eliminar usuario en el backend
				  await axios.delete(`${process.env.BACKEND_URL}/api/users/${userId}`);
				  
				  // Actualizar la lista de usuarios en el frontend
				  const updatedUsuarios = store.usuarios.filter((usuario) => usuario.id !== userId);
				  setStore({ usuarios: updatedUsuarios });
			  
				  console.log('Usuario eliminado exitosamente con ID:', userId);
				} catch (error) {
				  console.error('Error al eliminar el usuario:', error);
				}
			  },

              eliminarProducto: async (productId) => {
                try {
                    await axios.delete(`${process.env.BACKEND_URL}/api/products/${productId}`);
                    console.log('Producto eliminado exitosamente con ID:', productId);
            
                    // Actualiza la lista de productos en el frontend después de eliminar
                    const store = getStore();
                    const updatedProducts = store.productos.filter(producto => producto.id !== productId);
                    setStore({ productos: updatedProducts });
                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                }
            },
            
		






























































































		} //FIN DE ACTIONS
	};
};



















































//categoria- catalogo
obtenerProductosPorCategorias: async (categoria) => {
	try {
		const response = await axios.get(`${process.env.BACKEND_URL}/api/products`);
		const productosFiltrados = response.data.filter(item => item.category === categoria);
		setStore({ productos: productosFiltrados });
	} catch (error) {
		console.error('Error al obtener productos:', error);
	}
};

export default getState;
