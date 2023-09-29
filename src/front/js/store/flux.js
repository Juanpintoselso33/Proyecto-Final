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
			ordenes: [],
			extras: [],
			extrasSeleccionados: [],
			isAuthenticated: false,
			token: null,
			dailyMenu: null,
			mensajes: [],
			mensajesPorUsuario: []


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
				const store = getStore();
			  
				// Obtener los productos y extras del backend
				await getActions().obtenerAllProducts();
				await getActions().obtenerAllExtras();
			  
				// Verificar si el backend devolvió datos válidos
				const existingBackendProducts = store.productos || [];
				const existingBackendExtras = store.extras || [];
			  
				// Obtener los productos del localStorage si existen
				const localStorageProductos = JSON.parse(localStorage.getItem('productos') || '[]');
				const localStorageExtras = JSON.parse(localStorage.getItem('extras') || '[]');
			  
				if (store.productos.length === 0 && localStorageProductos.length === 0) {
				  // Asegurarse de que existingBackendProducts esté definido antes de pasarlo
				  preloadHamburgers(this, existingBackendProducts);
				  preloadMilanesas(this, existingBackendProducts);
				  preloadPromociones(this, existingBackendProducts);
			  
				  const updatedStore = getStore();
				  setStore(updatedStore);
			  
				  localStorage.setItem('productos', JSON.stringify(updatedStore.productos));
				}
			  
				if (store.extras.length === 0 && localStorageExtras.length === 0) {
				  // Asegurarse de que existingBackendExtras esté definido antes de pasarlo
				  preloadExtras(this, existingBackendExtras);
			  
				  const updatedStore = getStore();
				  setStore(updatedStore);
			  
				  localStorage.setItem('extras', JSON.stringify(updatedStore.extras));
				}
			},

			obtenerAllExtras: async function () {
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/extras");
					
					if (response.status === 404) {
						// Si el servidor devuelve un 404, guardar un array vacío en localStorage y en la store
						setStore({ extras: [] });
						localStorage.setItem("extras", JSON.stringify([]));
						return;
					}
					
					let data = await response.json();
					
					// Si se obtiene una respuesta válida, guardar los datos en la store y en localStorage
					setStore({ extras: data });
					localStorage.setItem("extras", JSON.stringify(data));
					
				} catch (error) {
					console.log(error);
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

			// Funcion para dar de alta registros
			registerUser: async (formData) => {
				try {
					const response = await axios.post(process.env.BACKEND_URL + 'api/register', formData);

					if (response.status === 200 || response.status === 201) {
						console.log('Registro exitoso:', response.data);

						// Devolver los datos de respuesta del servidor
						return response.data;
					} else {
						console.log('Error en el registro:', response);

						if (response.data.error) {
							alert(response.data.error); // Mostrar el mensaje de error al usuario
						} else {
							alert('Error en la solicitud'); // Mostrar un mensaje genérico en caso de error
						}
					}
				} catch (error) {
					console.error('Hubo un problema con la petición:', error);

					if (error.response && error.response.data && error.response.data.error) {
						alert(error.response.data.error); // Mostrar el mensaje de error al usuario
					} else {
						alert('Error en la solicitud'); // Mostrar un mensaje genérico en caso de error
					}
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

			login: async (email, password) => {
				try {
					// Antes de realizar la solicitud
					console.log("Iniciando solicitud de inicio de sesión...");

					const response = await axios.post(`${process.env.BACKEND_URL}api/login`, {
						email,
						password
					});

					// Verificar si la respuesta es exitosa
					if (response.status === 200) {
						const userData = response.data;

						if (userData && userData.id) {
							localStorage.setItem("userId", userData.id.toString());
						} else {
							throw new Error("ID de usuario no encontrado en la respuesta");
						}

						localStorage.setItem("token", userData.access_token);
						localStorage.setItem("email", email);

						const isAdmin = userData && userData.role === "admin";
						localStorage.setItem("isAdmin", isAdmin.toString());

						// Actualiza el estado global
						setStore({
							isAuthenticated: true,
							token: userData.access_token,
							email,
							userId: userData.id,
							isAdmin
						});

						// Antes de retornar true
						console.log("Inicio de sesión exitoso.");

						return { success: true };
					} else {
						throw new Error("Error durante el inicio de sesión");
					}
				} catch (error) {
					// En caso de error
					console.error("Error durante el inicio de sesión:", error);

					// Aquí puedes manejar el error específico del 401
					if (error.response && error.response.status === 401) {
						throw new Error("Error 401: No autorizado, comprueba tus credenciales");
					} else {
						throw new Error("Error durante el inicio de sesión");
					}
				}
			},




			logout: () => {
				console.log("Ejecutando función logout");

				// Eliminar elementos del localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("email");
				localStorage.removeItem("cart");
				localStorage.removeItem("isAdmin");
				localStorage.removeItem("userId");  // Añadir esta línea para borrar isAdmin del localStorage

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

					const cartFromStore = JSON.parse(localStorage.getItem("cart"));

					console.log("Estado del carrito antes de crear la orden:", cartFromStore);

					if (!cartFromStore || cartFromStore.items.length === 0) {
						console.log("El carrito está vacío. No se puede crear la orden.");
						return null;
					}

					const items = cartFromStore.items.map(item => ({
						product_id: item.product_id,
						quantity: item.quantity,
						extras: item.extras || []
					}));

					const payload = {
						items,
					};

					const url = `${process.env.BACKEND_URL}/api/user/${userId}/add_order`;

					const token = localStorage.getItem("token");

					const response = await axios.post(url, payload, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					});

					const data = response.data;
					if (data.success) {
						console.log('Order created:', data.order);
						getActions().clearCart();
						return data.order;  // Retorna la orden creada
					} else {
						console.log('Order creation failed:', data.message);
						return null;
					}
				} catch (error) {
					console.log('An error occurred:', error);
					return null;
				}
			},
			clearCart: () => {
				// Limpia el carrito del localStorage
				localStorage.removeItem("cart");

				// Limpia el carrito del store (asumiendo que tienes un store para el carrito)
				// Puedes adaptar esta parte según cómo estés manejando el estado en tu aplicación
				setStore({
					cart: {
						items: [],
						totalCost: 0
					}
				});

				console.log("El carrito ha sido limpiado.");
			},



			updateOrderStatus: async (order_id, new_status) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/update_order_status`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							order_id,
							new_status,
						}),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Estado del pago actualizado con éxito:", data);
					} else {
						console.log("Error al actualizar el estado del pago");
					}
				} catch (error) {
					console.error("Ocurrió un error al actualizar el estado del pago:", error);
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
					const response = await axios.post(process.env.BACKEND_URL + '/api/extras', extra);

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
					const token = localStorage.getItem('token');  // Asegúrate de obtener el token de la manera correcta
					const config = {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					};

					const response = await axios.put(
						`${process.env.BACKEND_URL}api/users/${userId}`,
						updatedData,
						config
					);

					if (response.status === 200) {
						console.log('Usuario actualizado exitosamente:', response.data);

						// Actualizar el estado de Flux si es necesario
						const store = getStore();
						const index = store.usuarios.findIndex(usuario => usuario.id === userId);

						if (index !== -1) {
							store.usuarios[index] = { ...store.usuarios[index], ...updatedData };
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

			obtenerTodasLasOrdenes: async () => {
				try {
					const response = await axios.get(`${process.env.BACKEND_URL}api/orders`);

					if (response.data.success) {
						setStore({
							ordenes: response.data.orders
						});
					} else {
						console.error('Error al obtener todas las órdenes:', response.data.message);
					}
				} catch (error) {
					console.error('Error al obtener todas las órdenes:', error);
				}
			},


			obtenerOrdenesUsuario: async () => {
				try {
					const userId = localStorage.getItem('userId');
					const response = await axios.get(`${process.env.BACKEND_URL}api/user/${userId}/orders`);

					if (response.data.success) {
						setUserOrders(response.data.orders);
					} else {
						console.error('Error al obtener las órdenes del usuario:', response.data.message);
					}
				} catch (error) {
					console.error('Error al obtener las órdenes del usuario:', error);
				}
			},


			async updatePassword(newPassword, id) {
				try {
					const userId = id;
					const token = localStorage.getItem("token");

					const response = await axios.put(`${process.env.BACKEND_URL}api/users/${userId}`, {
						password: newPassword,
					}, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.data.success) {
						// Actualiza la contraseña en el estado local
						setStore((prevState) => ({
							...prevState,
							password: newPassword,
						}));

						return { success: true };
					} else {
						console.error('Error al actualizar la contraseña:', response.data.message);
						return { success: false, message: response.data.message };
					}
				} catch (error) {
					console.error('Error al actualizar la contraseña:', error);
					return { success: false, message: error.message };
				}
			},

			updateProduct: async (productId, productData) => {
				try {
					const token = localStorage.getItem("token"); // Asumiendo que el token se guarda en el localStorage
					const response = await axios.put(`${process.env.BACKEND_URL}api/products/${productId}`, productData, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.data.success) {
						console.log("Producto actualizado exitosamente:", response.data);

						// Aquí puedes actualizar el estado de tu tienda, por ejemplo:
						const store = getStore();
						const updatedProducts = store.productos.map(product => {
							if (product.id === productId) {
								return { ...product, ...productData };
							}
							return product;
						});
						setStore({ productos: updatedProducts });

						// Actualizar localStorage
						localStorage.setItem('productos', JSON.stringify(updatedProducts));
					} else {
						console.error("Error al actualizar el producto:", response.data.message);
					}
				} catch (error) {
					console.error("Ocurrió un error al intentar actualizar el producto:", error);
				}
			},

			async validarContrasena(contrasenaActual) {
				try {
					const token = localStorage.getItem("token");
					const response = await axios.post(`${process.env.BACKEND_URL}api/validate-password`, {
						password: contrasenaActual,
					}, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.data.valid) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.error('Error al validar la contraseña:', error);
					return false;
				}
			},
			async updateEmail(newEmail, userId) {
				try {
					// Obtener todos los usuarios
					const allUsersResponse = await axios.get(`${process.env.BACKEND_URL}api/users`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("token")}`
						}
					});

					// Verificar si el nuevo correo electrónico ya existe
					const emailExists = allUsersResponse.data.some(user => user.email === newEmail);

					if (emailExists) {
						console.error('El correo electrónico ya existe.');
						return { success: false, message: 'El correo electrónico ya existe.' };
					}

					// Actualizar el correo electrónico
					const response = await axios.put(`${process.env.BACKEND_URL}api/users/${userId}`, {
						email: newEmail,
					}, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("token")}`
						}
					});

					if (response.data.success) {
						// Actualizar el correo electrónico en el estado local
						setStore((prevState) => ({
							...prevState,
							email: newEmail,
						}));

						return { success: true, message: 'Correo electrónico actualizado con éxito.' };
					} else {
						console.error('Error al actualizar el correo electrónico:', response.data.message);
						return { success: false, message: response.data.message };
					}
				} catch (error) {
					console.error('Error al actualizar el correo electrónico:', error);
					return { success: false, message: error.message };
				}
			},



























			enviarMensaje: async (nombre, email, asunto, mensaje) => {
				const userId = localStorage.getItem('userId');
				const payload = {
					nombre,
					email,
					asunto,
					mensaje,
					userId: userId ? userId : null
				};
				try {
					const res = await axios.post(`${process.env.BACKEND_URL}api/messages`, payload);
					if (res.status === 201) {
						console.log('Mensaje enviado correctamente');
					}
					return res;  // Asegúrate de retornar la respuesta aquí
				} catch (error) {
					console.error('Hubo un error al enviar el mensaje', error);
					return error.response;  // También puedes retornar la respuesta de error aquí
				}
			},

			obtenerMensajes: async () => {
				try {
					const res = await axios.get(`${process.env.BACKEND_URL}api/messages`);
					if (res.status === 200) {
						return Array.isArray(res.data.messages) ? res.data.messages : [];
					}
				} catch (error) {
					return [];
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
