import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const UsuarioEstandar = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Perfil');
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userId, setUserId] = useState(store.userId); // Agrega el estado para almacenar el userId

  // Inicializa el estado con la contraseña del Local Storage
  useEffect(() => {
    const storedPassword = localStorage.getItem('userPassword');
    if (storedPassword) {
      setCurrentPassword(storedPassword);
    }
  }, []);

  const initial = store.email ? store.email.charAt(0).toUpperCase() : '';

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMatch(true);
    setIsCurrentPasswordValid(true);
    setShowPasswordAlert(false);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    if (currentPassword !== store.password) {
      setIsCurrentPasswordValid(false);
      setShowPasswordAlert(true);
      return;
    }

    // Actualiza la contraseña en el estado local
    actions.updatePassword(newPassword);

    // Guarda la nueva contraseña en el Local Storage
    localStorage.setItem('userPassword', newPassword);

    setShowPasswordAlert(false);
    handleCloseModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/user/${userId}/orders`);
        if (!response.data.error) {
          setUserOrders(response.data.orders);
        } else {
          console.error('Error al obtener las órdenes del usuario:', response.data.error);
        }
      } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
      }
    };

    if (categoriaSeleccionada === 'Ordenes') {
      fetchData();
    }
  }, [categoriaSeleccionada, userId]);

  const getProductNameById = (productId) => {
    return store.productos.find(item => item.id === productId) || null;
  };

  const getProductExtras = (extras) => {
    return extras.map((extra, index) => (
      <li key={index}>
        {extra.name} - ${extra.price}
      </li>
    ));
  };

  const calcularCostoTotal = (item) => {
    let costoTotal = 0;

    const productInfo = getProductNameById(item.product_id);
    if (productInfo) {
      costoTotal += item.quantity * productInfo.cost;

      if (item.extras) {
        item.extras.forEach(extra => {
          costoTotal += extra.price;
        });
      }
    }

    return costoTotal;
  };

  return (
    <div className="usuario-estandar">
      <div className="menu">
        <div className="perfil">
          <img
            src={`https://ui-avatars.com/api/?name=${initial}&background=7a7a7a&color=ffffff&size=128`}
            alt="Foto de perfil"
          />
        </div>
        <div className="opciones">
          <span className={`opcion-perfil ${categoriaSeleccionada === 'Perfil' ? 'active' : ''}`} onClick={() => handleCategoriaSeleccionada('Perfil')}>
            Ver mi perfil
          </span>
          <span className={`opcion-ordenes ${categoriaSeleccionada === 'Ordenes' ? 'active' : ''}`} onClick={() => handleCategoriaSeleccionada('Ordenes')}>
            Ver mis órdenes
          </span>
          <Link to="/" className="volver-inicio">Volver al inicio</Link>
        </div>
      </div>

      <div className="perfil-detalle">
        {categoriaSeleccionada === 'Perfil' && (
          <div>
            <h3>Mi Perfil</h3>
            <table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>{store.email}</td>
                </tr>
                <tr>
                  <td>Contraseña:</td>
                  <td></td>
                  <td>
                    <button onClick={handleEditClick}>Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {categoriaSeleccionada === 'Ordenes' && (
          <div>
            <h3>Mis Órdenes</h3>
            <table className="table text-center">
              <thead>
                <tr>
                  <th className="text-center">Orden</th>
                  <th className="text-center">Fecha y hora</th>
                  <th className="text-center">Detalle</th>
                  <th className="text-center">Costo Total</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.timestamp}</td>
                    <td>
                      <ul>
                        {order.items.map((item, index) => {
                          const productInfo = getProductNameById(item.product_id);
                          return (
                            <div key={index}>
                              {item.quantity}- {productInfo ? <a href={productInfo.url}>{productInfo.name}</a> : 'Producto Desconocido'}
                              {productInfo && <span> - ${productInfo.cost}</span>}
                              {item.extras && (
                                <ul>
                                  {getProductExtras(item.extras)}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </ul>
                    </td>
                    <td className="costo-total text-center">
                      <strong>${order.items.reduce((total, item) => total + calcularCostoTotal(item), 0)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showPasswordAlert && (
            <Alert variant="danger" onClose={() => setShowPasswordAlert(false)} dismissible>
              Contraseña incorrecta
            </Alert>
          )}

          <form>
            <div className="form-group">
              <label htmlFor="currentPassword">Contraseña Actual</label>
              <input
                type="password"
                className={`form-control ${isCurrentPasswordValid ? '' : 'is-invalid'}`}
                id="currentPassword"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              {!isCurrentPasswordValid && <div className="invalid-feedback">La contraseña actual es incorrecta.</div>}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                className={`form-control ${passwordMatch ? '' : 'is-invalid'}`}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordMatch && <div className="invalid-feedback">Las contraseñas no coinciden.</div>}
            </div>
            <Button variant="light mt-3" type="button" onClick={handleSaveChanges} disabled={!isCurrentPasswordValid || !passwordMatch}>
              Guardar cambios
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
