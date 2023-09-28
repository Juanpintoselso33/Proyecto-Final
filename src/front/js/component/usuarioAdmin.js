import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import {EditProduct} from './EditProduct.jsx'

export const UsuarioAdmin = () => {
  const { actions, store } = useContext(Context);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Productos');
  const [showModal, setShowModal] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  


  useEffect(() => {
    actions.obtenerAllProducts();
    actions.obtenerUsuarios();
    actions.obtenerTodasLasOrdenes();
  }, [actions]);

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleEliminarProducto = (productId) => {
    const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmarEliminacion) {
      actions.eliminarProducto(productId);
    }
  };

  const handleEliminarUsuario = (userId) => {
    const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmarEliminacion) {
      actions.eliminarUsuario(userId);
    }
  };

  const handleAbrirModal = (productId) => {
    setProductIdToEdit(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderTablaProductos = () => {
    if (!categoriaSeleccionada || categoriaSeleccionada !== 'Productos') {
      return null;
    }

    let categoriasConProductos = {};
    store.productos.forEach((producto) => {
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
                          }}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                        <button onClick={() => handleAbrirModal(producto.id)}>Editar</button>
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
                  <ul>
                    {orden.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}- {item.product_name}
                        <span> - ${item.cost_with_extras}</span>
                        {item.extras.length > 0 && (
                          <ul>
                            {item.extras.map((extra, extraIndex) => (
                              <li key={extraIndex}>{extra.name} - ${extra.cost}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </ul>
                </td>
                <td className="text-center">
                  <strong>${orden.total_cost_with_extras}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  const renderTablaUsuarios = () => {
    if (!categoriaSeleccionada || categoriaSeleccionada !== 'Usuarios') {
      return null;
    }

    return (
      <div className="">
        <Link to="/addUsuario" className="btn btn-success float-right mt-4 mr-2 mb-3">
          Agregar Usuarios
        </Link>
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
                      <button onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
          </div>
        </div>
      </div>      
      {showModal && <EditProduct productId={productIdToEdit} onClose={handleCloseModal} />}
    </div>
  );

};