# Documentación de la Base de Datos de la Tienda en Línea

## Tabla de Contenidos

- [Introducción](#introducción)
- [Modelos de Datos](#modelos-de-datos)
  - [Modelo `User`](#modelo-user)
  - [Modelo `Product`](#modelo-product)
  - [Modelo `Order`](#modelo-order)
  - [Modelo `OrderProduct`](#modelo-orderproduct)
- [Endpoints de la API](#endpoints-de-la-api)
  - [Usuarios](#usuarios)
  - [Productos](#productos)
  - [Órdenes](#órdenes)

## Introducción

Esta base de datos se utiliza para gestionar una tienda en línea. Contiene modelos para manejar productos, usuarios y órdenes.

## Modelos de Datos

### Modelo `User`

| Campo     | Tipo       | Descripción                               |
|-----------|------------|-------------------------------------------|
| id        | Integer    | Identificador único del usuario           |
| email     | String     | Dirección de correo electrónico del usuario |
| password  | String     | Contraseña del usuario                    |
| role      | String     | Rol del usuario (por defecto: 'customer')  |

**Relaciones:**

- `orders`: Relación con el modelo `Order`.

### Modelo `Product`

| Campo       | Tipo       | Descripción                        |
|-------------|------------|------------------------------------|
| id          | Integer    | Identificador único del producto   |
| cost        | Float      | Costo del producto                 |
| name        | String     | Nombre del producto                |
| description | String     | Descripción del producto           |
| stars       | Integer    | Calificación del producto          |
| img_url     | String     | URL de la imagen del producto      |
| category    | String     | Categoría del producto             |

**Relaciones:**

- `order_products`: Relación con el modelo `OrderProduct`.

### Modelo `Order`

| Campo      | Tipo       | Descripción                               |
|------------|------------|-------------------------------------------|
| id         | Integer    | Identificador único del pedido            |
| total_cost | Float      | Costo total del pedido                    |
| timestamp  | DateTime   | Fecha y hora del pedido                   |
| user_id    | Integer    | Identificador del usuario que hizo el pedido |

**Relaciones:**

- `items`: Relación con el modelo `OrderProduct`.
- `user`: Relación con el modelo `User`.

### Modelo `OrderProduct`

| Campo      | Tipo       | Descripción                               |
|------------|------------|-------------------------------------------|
| id         | Integer    | Identificador único del producto en el pedido |
| order_id   | Integer    | Identificador del pedido                  |
| product_id | Integer    | Identificador del producto                |
| quantity   | Integer    | Cantidad del producto                     |
| cost       | Float      | Costo del producto en el pedido           |
| its_promo  | Boolean    | Indica si el producto está en promoción   |

**Relaciones:**

- `product`: Relación con el modelo `Product`.
- `order`: Relación con el modelo `Order`.

## Endpoints de la API

Todos los endpoints están prefijados con `/api`.

### Usuarios

#### `POST /login`

Autentica a un usuario.

**Parámetros**

- `email`: Dirección de correo electrónico del usuario.
- `password`: Contraseña del usuario.

#### `GET /users`

Obtiene una lista de todos los usuarios.

#### `GET /user/<int:user_id>`

Obtiene la información de un usuario específico.

#### `POST /register`

Registra un nuevo usuario.

**Parámetros**

- `email`: Dirección de correo electrónico del usuario.
- `password`: Contraseña del usuario.

#### `PUT /user/<int:user_id>`

Actualiza la información de un usuario.

#### `DELETE /user/<int:user_id>`

Elimina un usuario.

### Productos

#### `GET /products`

Obtiene una lista de todos los productos.

#### `GET /products/<int:product_id>`

Obtiene la información de un producto específico.

#### `POST /products`

Añade un nuevo producto.

#### `PUT /product/<int:product_id>`

Actualiza un producto.

#### `DELETE /product/<int:product_id>`

Elimina un producto.

### Órdenes

#### `GET /orders`

Obtiene una lista de todas las órdenes.

#### `GET /user/<int:user_id>/orders`

Obtiene todas las órdenes de un usuario específico.

#### `POST /user/<int:user_id>/add_order`

Añade una nueva orden.
