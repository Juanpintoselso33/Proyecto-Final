import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { EditProduct } from './EditProduct.jsx'
import { RegisterModal } from './register.js'
import { OrderDetailsModal } from './OrderDetails.jsx';

export const UsuarioAdmin = () => {
  const { actions, store } = useContext(Context);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Productos');
  const [showModal, setShowModal] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mensajes, setMensajes] = useState([]); // Nuevo estado para los mensajes
  const [recargarDatos, setRecargarDatos] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    actions.obtenerAllProducts();
    actions.obtenerUsuarios();
    actions.obtenerTodasLasOrdenes();

    const cargarMensajes = async () => {
      const mensajesObtenidos = await actions.obtenerMensajes();
      if (mensajesObtenidos) {
        setMensajes(mensajesObtenidos);
      }
    };
    cargarMensajes();

    // Restablecer la bandera
    if (recargarDatos) {
      setRecargarDatos(false);
    }
  }, []);


  useEffect(() => {
    actions.obtenerAllProducts();
    actions.obtenerUsuarios();
    actions.obtenerTodasLasOrdenes();

    const cargarMensajes = async () => {
      const mensajesObtenidos = await actions.obtenerMensajes();
      if (mensajesObtenidos) {
        setMensajes(mensajesObtenidos);
      }
    };
    cargarMensajes();

    // Restablecer la bandera
    if (recargarDatos) {
      setRecargarDatos(false);
    }
  }, [recargarDatos]);

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleEliminarProducto = (productId) => {
    const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmarEliminacion) {
      actions.eliminarProducto(productId);
      setRecargarDatos(true);
    }
  };


  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
    setRecargarDatos(true);
  };

  const handleCloseRegisterModal = () => { // Asegúrate de que esta función esté definida
    setShowRegisterModal(false);
    setRecargarDatos(true);
  };


  const handleEliminarUsuario = (userId) => {
    const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmarEliminacion) {
      actions.eliminarUsuario(userId);
      setRecargarDatos(true);
    }
  };

  const handleAbrirModal = (productId) => {
    setProductIdToEdit(productId);
    setShowModal(true);
    setRecargarDatos(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRecargarDatos(true);
  };

  // Función para mostrar el modal de detalles de la orden
  const handleMostrarDetalleOrden = (orden) => {
    setSelectedOrder(orden);
    setShowOrderDetails(true);
  };

  // Función para cerrar el modal de detalles de la orden
  const handleCerrarDetalleOrden = () => {
    setSelectedOrder(null);
    setShowOrderDetails(false);
  };


  const renderTablaProductos = () => {
    if (!categoriaSeleccionada || categoriaSeleccionada !== 'Productos') {
      return null;
    }

    // Filtrar productos que están en promoción
    const productosPromo = store.productos.filter(producto => producto.its_promo === true);

    // Filtrar productos que no están en promoción
    const productosNoPromo = store.productos.filter(producto => producto.its_promo !== true);

    let categoriasConProductos = {};
    productosNoPromo.forEach((producto) => {
      const { category, name, id, img_url, description, cost } = producto;
      if (!categoriasConProductos[category]) {
        categoriasConProductos[category] = [];
      }
      categoriasConProductos[category].push({ id, img_url, name, description, cost });
    });

    return (
      <div className="">
        <Link to="/addProduct" className="btn btn-success float-right mt-4 mr-2 mb-3">
          Agregar Productos
        </Link>

        {/* Sección para productos en promoción */}
        <div className="tabla-categoria">
          <h3>Productos en Promoción</h3>
          <table className="table" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>URL</th>
                <th>NOMBRE</th>
                <th>DESCRIPCION</th>
                <th>PRECIO</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosPromo.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.id}</td>
                  <td>
                    <img
                      src={producto.img_url}
                      width={60}
                      height={60}
                      className="card-img"
                      alt={producto.name}
                    />
                  </td>
                  <td>{producto.name}</td>
                  <td>{producto.description}</td>
                  <td>${producto.cost}</td>
                  <td>
                    <button className='btn btn-dark m-1' onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                    <button className='btn btn-dark m-1' onClick={() => handleAbrirModal(producto.id)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Secciones para las demás categorías */}
        {Object.keys(categoriasConProductos).map((categoria, index) => {
          categoriasConProductos[categoria].sort((a, b) => a.id - b.id);
          return (
            <div
              key={index}
              className={`tabla-categoria ${categoriaSeleccionada === categoria ? 'active' : ''}`}
            >
              <h3>{categoria}</h3>
              <table className="table" border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>URL</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCION</th>
                    <th>PRECIO</th>
                    <th>Menú del Día</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriasConProductos[categoria].map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.id}</td>
                      <td>
                        <img
                          src={producto.img_url}
                          width={60}
                          height={60}
                          className="card-img"
                          alt={producto.name}
                        />
                      </td>
                      <td>{producto.name}</td>
                      <td>{producto.description}</td>
                      <td>${producto.cost}</td>
                      <td>
                        <input
                          type="radio"
                          name="menuDelDia"
                          checked={localStorage.getItem('dailyMenu') === producto.id.toString()}
                          onChange={() => {
                            actions.cambiarMenuDelDia(producto.id);
                            setRecargarDatos(true);
                          }}
                        />
                      </td>
                      <td>
                        <button className='btn btn-dark m-1' onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                        <button className='btn btn-dark m-1' onClick={() => handleAbrirModal(producto.id)}>Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTablaOrdenes = () => {
    if (!categoriaSeleccionada || categoriaSeleccionada !== 'Órdenes') {
      return null;
    }

    return (
      <div className={`tabla-categoria ${categoriaSeleccionada === 'Órdenes' ? 'active' : ''}`}>
        <h3 className="pb-2 text-center">Órdenes</h3>
        <table className="table text-center">
          <thead>
            <tr>
              <th className="text-center">Orden</th>
              <th className="text-center">ID de Usuario</th>
              <th className="text-center">Fecha y hora</th>
              <th className="text-center">Detalle</th>
              <th className="text-center">Costo Total</th>
            </tr>
          </thead>
          <tbody>
            {store.ordenes && store.ordenes.map((orden, index) => (
              <tr key={index}>
                <td className="text-center">{orden.id}</td>
                <td className="text-center">{orden.user_id}</td>
                <td className="text-center">{orden.timestamp}</td>                
                <td className="text-center">
                  <strong>${orden.total_cost_with_extras}</strong>
                </td>
                <td className="text-center">
                  {/* Agrega el botón "Detalles" que abre el modal de detalles */}
                  <button className='btn btn-dark m-1' onClick={() => handleMostrarDetalleOrden(orden)}>Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Renderiza el modal de detalles de la orden si showOrderDetails es true */}
        {showOrderDetails && <OrderDetailsModal order={selectedOrder} onClose={handleCerrarDetalleOrden} />}
      </div>
    );
  };



  const renderTablaUsuarios = () => {
    if (!categoriaSeleccionada || categoriaSeleccionada !== 'Usuarios') {
      return null;
    }

    const handleCambiarRol = (userId, currentRole) => {
      const nuevoRol = currentRole === 'admin' ? 'customer' : 'admin';
      actions.actualizarUsuario(userId, { role: nuevoRol });
      setRecargarDatos(true);
    };

    return (
      <div className="">
        <button onClick={handleOpenRegisterModal} className="btn btn-success float-right mt-4 mr-2 mb-3">
          Agregar Usuarios
        </button>
        <div className={`tabla-categoria ${categoriaSeleccionada === 'Usuarios' ? 'active' : ''}`}>
          <h3 className="pb-2">Información de Usuarios</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {store.usuarios &&
                store.usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.id}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                    <td>
                      <button onClick={() => handleEliminarUsuario(usuario.id)} className="btn btn-dark m-1">Eliminar</button>
                      <button onClick={() => handleCambiarRol(usuario.id, usuario.role)} className="btn btn-dark m-1">
                        {usuario.role === 'admin' ? 'Convertir a Customer' : 'Convertir a Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTablaMensajes = () => {
    if (!categoriaSeleccionada || categoriaSeleccionada !== 'Mensajes') {
      return null;
    }

    return (
      <div className={`tabla-categoria ${categoriaSeleccionada === 'Mensajes' ? 'active' : ''}`}>
        <h3 className="pb-2">Mensajes</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Asunto</th>
              <th>Mensaje</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.map((mensaje, index) => (
              <tr key={index}>
                <td>{mensaje.id}</td>
                <td>{mensaje.name}</td>
                <td>{mensaje.email}</td>
                <td>{mensaje.subject}</td>
                <td>{mensaje.message}</td>
                <td>{mensaje.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  return (
    <div className="admin-menu">


      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-md-3 bg-light ml-4">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <span
                  className="nav-link text-black "
                  onClick={() => handleCategoriaSeleccionada('Productos')}
                >
                  Administrar Productos
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link text-black"
                  onClick={() => handleCategoriaSeleccionada('Órdenes')}
                >
                  Ver todas las Órdenes
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link text-black"
                  onClick={() => handleCategoriaSeleccionada('Usuarios')}
                >
                  Administrar Usuarios
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link text-black"
                  onClick={() => handleCategoriaSeleccionada('Mensajes')}
                >
                  Ver Mensajes
                </span>
              </li>
            </ul>
            <div className="mt-auto">
              <Link to="/" className="btn btn-secondary">
                Ir al Inicio
              </Link>
            </div>
          </div>
          <div className="col-md-9">
            {renderTablaProductos()}
            {renderTablaUsuarios()}
            {renderTablaOrdenes()}
            {renderTablaMensajes()}
          </div>
        </div>
      </div>
      {showModal && <EditProduct productId={productIdToEdit} onClose={handleCloseModal} />}
      {showRegisterModal && <RegisterModal show={showRegisterModal} onHide={handleCloseRegisterModal} />}
    </div>
  );

};