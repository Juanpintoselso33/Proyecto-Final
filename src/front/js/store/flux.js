import React from "react";
import axios from 'axios';
import { preloadPromociones, preloadExtras, preloadHamburgers, preloadMilanesas } from '../component/PreloadData.js';
import { CartStore } from '../component/CartStore.js';


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			/* ----------<productos>--------------- */
			cart: { items: [], totalCost: 0 },
			isAdmin: false,
			datosPrueba: [],
			modalData: [],
			productos: [],
			extras: [],
			extrasSeleccionados: [],
			isAuthenticated: false,
			token: null,
			dailyMenu: null

			/* ----------</productos>--------------- */
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
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

			preloadDataIfNeeded: async function () {
				const store = getStore(); // Obtener el estado actual del flux

				// Obtener los productos del localStorage si existen
				const localStorageProductos = JSON.parse(localStorage.getItem('productos') || '[]');
				const localStorageExtras = JSON.parse(localStorage.getItem('extras') || '[]');

				if (store.productos.length === 0 && localStorageProductos.length === 0) {
					// Si no hay datos de productos, cargarlos desde el componente PreloadComponent
					preloadHamburgers(this)
					preloadMilanesas(this)
					preloadPromociones(this)

					// Después de cargar los datos, actualiza el estado del flux
					const updatedStore = getStore(); // Obtener el estado actualizado
					setStore(updatedStore); // Actualizar el estado del flux con los datos de productos cargados

					// Guardar los datos de productos en el localStorage
					localStorage.setItem('productos', JSON.stringify(updatedStore.productos));
				}

				if (store.extras.length === 0 && localStorageExtras.length === 0) {
					// Si no hay datos de extras, cargarlos desde el componente PreloadComponent
					preloadExtras(this);

					// Después de cargar los datos, actualiza el estado del flux
					const updatedStore = getStore(); // Obtener el estado actualizado
					setStore(updatedStore); // Actualizar el estado del flux con los datos de extras cargados

					// Guardar los datos de extras en el localStorage
					localStorage.setItem('extras', JSON.stringify(updatedStore.extras));
				}
			},

			/* -----------------Productos-----------------*/
			obtenerAllProducts: async function () {
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/products");
					let data = await response.json();

					// Guardar los productos en la store
					setStore({ productos: data });

					// Guardar los productos en el localStorage
					localStorage.setItem("productos", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},
			/* -----------------Registro-----------------*/

			//Funcion para dar de alta registros
			registerUser: async (formData) => {
				try {
					const response = await axios.post(process.env.BACKEND_URL + 'api/register', formData);

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
					const response = await axios.post(process.env.BACKEND_URL + 'api/products', productData);
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

				getActions().initializeCart();
			},


			login: async (email, password) => {
				try {
					const response = await axios.post(process.env.BACKEND_URL + 'api/login', {
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

					const isAdmin = userData && userData.role === "admin";

					// Depuración: Imprimir los valores para verificar
					console.log("Valor de userData.role:", userData.role);
					console.log("Valor de isAdmin:", isAdmin);

					// Guardar el valor de isAdmin como una cadena en localStorage
					localStorage.setItem("isAdmin", isAdmin.toString());

					// Actualizar el estado global
					setStore({
						isAuthenticated: true,
						token: userData.access_token,
						email,
						userId: userData.id,
						isAdmin  // Asegúrate de que esto actualiza correctamente tu estado global
					});

					return true;

				} catch (error) {
					console.log("Error during login:", error);
					return false;
				}
			},

			logout: () => {
				console.log("Ejecutando función logout");

				// Eliminar elementos del localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("email");
				localStorage.removeItem("cart");
				localStorage.removeItem("isAdmin");  // Añadir esta línea para borrar isAdmin del localStorage

				// Actualizar el estado global para limpiar la autenticación y el carrito
				setStore({
					isAuthenticated: false,
					token: null,
					email: null,
					userId: null, // Añadir esto si también almacenas userId en el estado global
					cart: { items: [], totalCost: 0 },
					isAdmin: false  // Añadir esto para actualizar el estado de isAdmin
				});
			},

			createOrder: async () => {
				try {
					const userId = localStorage.getItem("userId");

					if (!userId) {
						throw new Error("User ID is undefined");
					}

					// Obtén el carrito directamente desde el estado del store (Flux)
					const cartFromStore = getStore().cart;  // Asegúrate de que `getStore()` esté definido correctamente

					console.log("Estado del carrito antes de crear la orden:", cartFromStore);

					if (!cartFromStore || cartFromStore.items.length === 0) {
						console.log("El carrito está vacío. No se puede crear la orden.");
						return;
					}

					const items = cartFromStore.items.map(item => ({
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
						actions.clearCart();  // Limpia el carrito usando el método del Flux
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

			addExtra: async (extra) => {
				try {
					const response = await axios.post(process.env.BACKEND_URL + 'api/extras', extra);

					if (response.status === 200 || response.status === 201) {
						console.log('Extra agregado exitosamente:', response.data);

						// Obtener y actualizar el estado del flux (store)
						const store = getStore();
						store.extras.push(response.data);
						setStore(store);

						// Guardar en localStorage
						localStorage.setItem('extras', JSON.stringify(store.extras));
					} else {
						console.log('Error al agregar el extra:', response);
					}
				} catch (error) {
					console.error('Hubo un problema con la petición:', error);
				}
			},

			cargarProductosDesdeLocalStorage: () => {
				const productosLocalStorage = localStorage.getItem('productos');
				const productosAlmacenados = productosLocalStorage ? JSON.parse(productosLocalStorage) : [];

				if (productosAlmacenados.length > 0) {
					setStore({ productos: productosAlmacenados });
				}
			},
			//Cargo datos para modal

			DataModalDetalle: (data) => {
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

			// Inicializa el carrito desde localStorage
			initializeCart: () => {
				const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalCost: 0 };
				if (storedCart.items.length > 0) {
					setStore({ cart: storedCart });
				}
			},

			// Guarda el carrito en localStorage
			saveCart: () => {
				const store = getStore();
				localStorage.setItem('cart', JSON.stringify(store.cart));
			},

			// Acción para incrementar la cantidad de un producto en el carrito
			handleIncrement: (order_id) => {
				const store = getStore();
				const updatedCart = CartStore.handleIncrement(store.cart, order_id);
				setStore({ cart: updatedCart });
				getActions().saveCart();
			},

			// Acción para decrementar la cantidad de un producto en el carrito
			handleDecrement: (order_id) => {
				const store = getStore();
				const updatedCart = CartStore.handleDecrement(store.cart, order_id);
				setStore({ cart: updatedCart });
				getActions().saveCart();
			},

			// Acción para añadir un producto al carrito
			addToCart: (id, quantity, price, name, extras) => {
				const store = getStore();
				const updatedCart = CartStore.addToCart(store.cart, id, quantity, price, name, extras);
				setStore({ cart: updatedCart });
				getActions().saveCart();
			},

			// Acción para eliminar un producto del carrito
			removeFromCart: (order_id) => {
				const store = getStore();
				const updatedCart = CartStore.removeFromCart(store.cart, order_id);
				setStore({ cart: updatedCart });
				getActions().saveCart();
			},

			actualizarUsuario: async (userId, updatedData) => {
				try {
					const response = await axios.put(`${process.env.BACKEND_URL}api/users/${userId}`, updatedData);

					if (response.status === 200) {
						console.log('Usuario actualizado exitosamente:', response.data);

						// Actualizar el estado de Flux si es necesario
						const store = getStore();
						const index = store.usuarios.findIndex(usuario => usuario.id === userId);

						if (index !== -1) {
							store.usuarios[index] = response.data;
							setStore({ usuarios: [...store.usuarios] });
						}

					} else {
						console.log('Error al actualizar el usuario:', response);
					}
				} catch (error) {
					console.error('Hubo un problema con la petición:', error);
				}
			},

			actualizarMenuDelDiaEnStoreYLocalStorage: (nuevoProductoId, anteriorProductoId) => {
				const store = getStore();
				// Clonamos el array para evitar mutaciones directas
				const nuevosProductos = [...store.productos].map(producto => {
					if (producto.id === anteriorProductoId) {
						return { ...producto, its_daily_menu: false };
					}
					if (producto.id === nuevoProductoId) {
						return { ...producto, its_daily_menu: true };
					}
					return producto;
				});
			
				// Actualizar el estado de la tienda
				setStore(prevStore => ({
					...prevStore,
					productos: nuevosProductos
				}));
			
				// Actualizar el localStorage
				localStorage.setItem('productos', JSON.stringify(nuevosProductos));
			},

			cambiarMenuDelDia: async (productId) => {
				try {
					const response = await axios.put(`${process.env.BACKEND_URL}api/daily_menu/${productId}`);
					const data = response.data;

					if (data && data.success) {
						const anteriorProductoId = JSON.parse(localStorage.getItem('dailyMenu'));
						getActions().actualizarMenuDelDiaEnStoreYLocalStorage(data.daily_menu.id, anteriorProductoId);

						// Guardar nuevo menú del día en localStorage
						localStorage.setItem('dailyMenu', JSON.stringify(data.daily_menu.id));
					}
				} catch (error) {
					console.log("Error durante la actualización del menú del día:", error);
				}
			},

			obtenerMenuDelDia: async () => {
				try {
					const response = await axios.get(`${process.env.BACKEND_URL}api/daily_menu`);
					const data = response.data;

					if (Array.isArray(data) && data.length > 0) {
						// Aquí podrías actualizar el store y el localStorage
						getActions().actualizarMenuDelDiaEnStoreYLocalStorage(data[0].id, null);

						// Guardar nuevo menú del día en localStorage
						localStorage.setItem('dailyMenu', JSON.stringify(data[0].id));
					} else {
						console.log("No se encontraron productos para el menú del día.");
					}
				} catch (error) {
					console.log("Error durante la consulta del menú del día:", error);
				}
			},


















































































































			obtenerUsuarios: async () => {
				try {
					const response = await axios.get(`${process.env.BACKEND_URL}api/users`);
					const usuarios = response.data;
					setStore({ usuarios }); // Actualiza el estado con los usuarios obtenidos
				} catch (error) {
					console.error('Error al obtener usuarios:', error);
				}
			},



			eliminarUsuario: async (userId) => {
				try {
					// Eliminar usuario en el backend
					await axios.delete(`${process.env.BACKEND_URL}api/users/${userId}`);

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
					await axios.delete(`${process.env.BACKEND_URL}api/products/${productId}`);
					console.log('Producto eliminado exitosamente con ID:', productId);

					// Actualiza la lista de productos en el frontend después de eliminar
					const store = getStore();
					const updatedProducts = store.productos.filter(producto => producto.id !== productId);
					setStore({ productos: updatedProducts });
				} catch (error) {
					console.error('Error al eliminar el producto:', error);
				}
			},

			eliminarExtra: async (extraId) => {
				try {
					await axios.delete(`${process.env.BACKEND_URL}api/extras/${extraId}`);
					console.log('Extra eliminado exitosamente con ID:', extraId);

					// Actualiza la lista de extras en el frontend después de eliminar
					const store = getStore();
					const updatedExtras = store.extras.filter(extra => extra.id !== extraId);
					setStore({ extras: updatedExtras });
				} catch (error) {
					console.error('Error al eliminar el extra:', error);
				}
			},































































































		} //FIN DE ACTIONS
	};
};



















































//categoria- catalogo
obtenerProductosPorCategorias: async (categoria) => {
	try {
		const response = await axios.get(`${process.env.BACKEND_URL}api/products`);
		const productosFiltrados = response.data.filter(item => item.category === categoria);
		setStore({ productos: productosFiltrados });
	} catch (error) {
		console.error('Error al obtener productos:', error);
	}
};

export default getState;
