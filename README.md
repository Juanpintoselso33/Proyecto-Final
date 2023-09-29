# Ecommerce "Carrito el Tatin"

## Tabla de Contenidos
- [Introducción](#introducción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API (Backend)](#api-backend)
- [Frontend](#frontend)
- [Configuración y Despliegue](#configuración-y-despliegue)
- [Contribuir](#contribuir)
- [Contacto](#contacto)

---

## Introducción

"Ecommerce 'Carrito el Tatin'" es una solución integral diseñada para gestionar un negocio de comercio electrónico. El sistema permite a los usuarios navegar a través de un catálogo de productos, añadirlos al carrito y realizar pagos en línea. Además, ofrece funcionalidades de administración que permiten a los propietarios del negocio gestionar productos, órdenes y realizar seguimientos en tiempo real. El proyecto está diseñado para ser escalable y fácilmente adaptable a diferentes tipos de negocios en línea.

---

## Tecnologías Utilizadas

- **Python**: Lenguaje de programación utilizado para el backend.
- **Flask**: Framework de Python utilizado para construir la API.
- **React.js**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **Webpack**: Empaquetador de módulos para aplicaciones modernas de JavaScript.
- **Stripe**: Plataforma de pagos en línea.
- **react-router-dom**: Biblioteca para la gestión de rutas en React.js.
- **Formik**: Biblioteca para la gestión de formularios en React.js.
- **Flask-JWT-Extended**: Extensión de Flask para trabajar con JSON Web Tokens (JWT).

---

El proyecto se divide en dos partes principales: el backend (API) y el frontend.

### Backend (API)

- **app.py**: Archivo principal que contiene la configuración de Flask y las rutas básicas.
  - Métodos: `handle_invalid_usage`, `serve_any_other_file`, `sitemap`
- **wsgi.py**: Configuración del servidor WSGI.
- **api/admin.py**: Configuración del panel de administración.
- **api/commands.py**: Comandos personalizados para la CLI.
- **api/models.py**: Modelos de la base de datos.
- **api/routes.py**: Rutas y controladores de la API.
- **api/utils.py**: Utilidades y excepciones personalizadas.

##### models.py

- **OrderProduct**: Representa un producto en una orden.
  - Atributos: `id`, `order_id`, `product_id`, `quantity`, `cost`
  - Relaciones:
    - `Order`: Una orden puede tener múltiples productos.
    - `Product`: Un producto puede estar en múltiples órdenes.
    - `Extra`: Un producto en una orden puede tener múltiples extras.

- **User**: Representa a un usuario.
  - Atributos: `id`, `email`, `password`, `role`
  - Relaciones:
    - `Order`: Un usuario puede tener múltiples órdenes.
    - `Message`: Un usuario puede tener múltiples mensajes.

- **Product**: Representa un producto.
  - Atributos: `id`, `cost`, `name`, `description`, `stars`, `img_url`, `category`, `its_promo`, `its_daily_menu`
  - Relaciones:
    - `OrderProduct`: Un producto puede estar en múltiples órdenes.

- **Order**: Representa una orden.
  - Atributos: `id`, `total_cost`, `timestamp`, `user_id`, `payment_status`
  - Relaciones:
    - `User`: Una orden pertenece a un usuario.
    - `OrderProduct`: Una orden puede tener múltiples productos.

- **Extra**: Representa un extra que se puede añadir a un producto en una orden.
  - Atributos: `id`, `name`, `price`, `type`, `categories`
  - Relaciones:
    - `OrderProduct`: Un extra puede estar en múltiples productos en diferentes órdenes.

- **Message**: Representa un mensaje enviado por un usuario.
  - Atributos: `id`, `name`, `email`, `subject`, `message`, `timestamp`, `user_id`
  - Relaciones:
    - `User`: Un mensaje puede estar asociado a un usuario registrado.

---

### Frontend

Ubicado en la carpeta `src/front`, el frontend se compone de varios archivos y subdirectorios:

#### Componentes (`component`)

- **App.jsx**: Componente principal de la aplicación.
- **backendURL.js**: Configuración de la URL del backend.
- **CardMultipleSlider.jsx**: Componente para el carrusel de tarjetas.
- **Carrusel_inicio.jsx**: Componente del carrusel en la página de inicio.
- **CartStore.js**: Store para la gestión del carrito de compras.
- **CheckoutForm.jsx**: Formulario de pago.
- **Contacto.jsx**: Componente para la sección de contacto.
- **EditProduct.jsx**: Componente para editar productos.
- **Extras_Productos.jsx**: Componente para gestionar extras en productos.
- **footer.js**: Componente del pie de página.
- **ItemCarrusel_inicio.jsx**: Elemento individual del carrusel de inicio.
- **login.js**: Componente de inicio de sesión.
- **navbar.js**: Componente de la barra de navegación.
- **OrderDetails.jsx**: Detalles de la orden.
- **PreloadData.js**: Precarga de datos.
- **Product.jsx**: Componente de producto individual.
- **ProductListContainer.jsx**: Contenedor de la lista de productos.
- **ProductList.jsx**: Lista de productos.
- **PruebaData.js**: Datos de prueba.
- **Prueba.jsx**: Componente de prueba.
- **register.js**: Componente de registro.
- **scrollToTop.js**: Componente para desplazamiento al inicio.
- **usuarioAdmin.js**: Componente para el usuario administrador.
- **usuarioEstandar.js**: Componente para el usuario estándar.

#### Páginas (`pages`)

- **addProduct.js**: Página para añadir nuevos productos.
  - Variables: AddProduct, file, finalProductData, formattedValue, handleChange, handleFileChange, handleSubmit, reader
  - Usos: Context, FileReader, Link, React, actions, alert, button, div, form, input, its_promo, label, name, productData, section, setItsPromo, setProductData, setSuccessMessage, successMessage, useContext, useState, value

- **addUsuario.js**: Página para añadir nuevos usuarios.
  - Variables: AddUsuario, handleChange, handleSubmit, isAdminUser
  - Usos: Context, Link, Navigate, React, actions, alert, button, div, form, input, label, name, section, setUserData, store, useContext, useState, userData, value, window

- **cart.js**: Página del carrito de compras.
  - Funciones: mover_carrito
  - Variables: CartView, cart, handleDecrement, handleIncrement, navigate, removeFromCart, totalCost
  - Usos: Cerrar, Context, FontAwesomeIcon, JSON, Logo, React, actions, button, div, extra, faArrowLeft, faMinus, faPlus, faTrashAlt, idx, index, isPressed, item, localStorage, order_id, parseFloat, section, setIsPressed, span, store, style, table, tbody, thead, useContext, useEffect, useNavigate, useState

- **confirmationPage.js**: Página de confirmación de pedido.
  - Variables: ConfirmationPage, name, parsedOrder, storedEmail, storedOrder
  - Usos: JSON, Link, React, div, email, index, item, localStorage, order, setEmail, setOrder, strong, table, tbody, thead, useEffect, useState

- **demo.js**: Página de demostración.
  - Variables: Demo
  - Usos: Context, Link, React, actions, button, div, index, item, span, store, useContext, useEffect, useState

- **home.js**: Página de inicio.
  - Variables: Home
  - Usos: CarruselInicio, Contacto, Context, Extras_prod, Navbar, ProductListContainer, React, actions, div, seccionActiva, setSeccionActiva, useContext, useEffect, useState

- **single.js**: Página de producto individual.
  - Variables: Single, params
  - Usos: Context, Link, PropTypes, React, div, img, props, rigoImageUrl, span, store, useContext, useEffect, useParams, useState

#### Store (`store`)

- **appContext.js**: Contexto de la aplicación.
  - Variables: Context, StoreWrapper, injectContext
  - Usos: Object, PassedComponent, Provider, React, getState, props, setState, state, updatedStore, useEffect, useState

- **flux.js**: Lógica del estado de la aplicación.
  - Variables: allUsersResponse, anteriorProductoId, cartFromStore, config, data, demo, email, emailExists, existingBackendExtras, existingBackendProducts, getState, index, isAdmin, items, localStorageExtras, localStorageProductos, nuevosProductos, payload, productosAlmacenados, productosFiltrados, productosLocalStorage, res, resp, response, store, storedCart, token, updatedCart, updatedExtras, updatedProducts, updatedStore, updatedUsuarios, url, userData, userId, usuarios
  - Usos: Array, CartStore, Error, JSON, alert, asunto, axios, categoria, color, console, contrasenaActual, elm, error, extra, extraId, extras, fetch, formData, getActions, getStore, item, localStorage, mensaje, name, newEmail, newPassword, new_status, nombre, nuevoProductoId, nuevosExtras, order_id, password, preloadExtras, preloadHamburgers, preloadMilanesas, preloadPromociones, prevState, prevStore, price, process, product, productData, productId, producto, quantity, setStore, setUserOrders, updatedData, user, usuario

## Configuración y Despliegue

### Requisitos

- Python 3.x
- Node.js y npm
- Base de datos PostgreSQL

### Configuración del entorno

1. **Backend**
    - Navega a la carpeta `src/api`.
    - Instala las dependencias de Python con `pipenv install`.
    - Configura las variables de entorno necesarias (por ejemplo, la cadena de conexión a la base de datos).
    - Ejecuta el servidor de desarrollo con `pipenv run flask run`.

2. **Frontend**
    - Navega a la carpeta `src/front`.
    - Instala las dependencias de Node.js con `npm install`.
    - Ejecuta el servidor de desarrollo de React con `npm start`.

### Migraciones de Base de Datos

Para gestionar migraciones de la base de datos, sigue estos pasos:

1. **Crear migración**: En la carpeta `src/api`, ejecuta `pipenv run migrate` para crear una nueva migración. Esto generará un archivo en la carpeta `migrations` que define los cambios en la base de datos.

2. **Aplicar migración**: Ejecuta `pipenv run upgrade` para aplicar la migración y actualizar la base de datos.

### Despliegue

- **Backend**: Puedes desplegar el backend en un servidor que soporte WSGI. Asegúrate de configurar las variables de entorno necesarias en el servidor.
- **Frontend**: Puedes construir la aplicación de React con `npm run build` y servir los archivos estáticos resultantes con cualquier servidor web.

## Contribuir

¡Gracias por tu interés en contribuir a este proyecto! Apreciamos cualquier tipo de contribución, ya sea en forma de correcciones de errores, nuevas características, pruebas o mejoras en la documentación. A continuación, se describen algunos pasos para contribuir:

1. **Forkea el Repositorio**: Haz un fork de este repositorio en GitHub haciendo clic en el botón "Fork" en la esquina superior derecha de la página.

2. **Clona tu Repositorio Fork**: Clona tu copia del repositorio a tu máquina local utilizando el comando `git clone` seguido de la URL de tu repositorio fork.

3. **Crea una Rama**: Crea una nueva rama en tu repositorio local para trabajar en tu contribución. Puedes hacerlo con el comando `git checkout -b nombre_de_la_rama`.

4. **Realiza tus Cambios**: Realiza los cambios necesarios en tu rama local. Asegúrate de seguir las guías de estilo y buenas prácticas del proyecto.

5. **Haz Commit y Push**: Haz commit de tus cambios con `git commit -m "Descripción de tus cambios"` y luego súbelos a tu repositorio fork con `git push origin nombre_de_la_rama`.

6. **Abre un Pull Request**: Ve a la página de tu repositorio fork en GitHub y haz clic en "New Pull Request". Describe tus cambios y crea el Pull Request. Estaremos encantados de revisarlo.

7. **Discusión y Revisión**: Tu Pull Request será revisado por los colaboradores del proyecto. Pueden surgir comentarios o preguntas, así que mantén un ojo en la conversación.

8. **Aprobación y Merge**: Una vez que tu Pull Request sea aprobado, uno de los colaboradores lo fusionará con la rama principal del proyecto.

9. **¡Enhorabuena!**: Has contribuido al proyecto de forma exitosa. Tu trabajo ayudará a mejorar la aplicación para todos.

Si tienes alguna pregunta o necesitas orientación adicional, no dudes en abrir un issue en el repositorio o ponerte en contacto con los colaboradores.

Esperamos con interés trabajar contigo y agradecemos tu contribución.

## Contacto

Si tienes preguntas, sugerencias, o simplemente quieres ponerte en contacto con el equipo detrás de este proyecto, no dudes en hacerlo. Estamos aquí para ayudarte.

- **GitHub**: [Juanpintoselso33](https://github.com/Juanpintoselso33)
- **GitHub**: [JorgeMRs](https://github.com/JorgeMRs)
- **GitHub**: [klgs1234](https://github.com/klgs1234)

¡Esperamos escucharte pronto!
