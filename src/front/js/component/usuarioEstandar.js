import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

export const UsuarioEstandar = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Perfil');
  const { store } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  const getInitialLetter = (email) => {
    return email ? email.charAt(0).toUpperCase() : '';
  };

  const initial = getInitialLetter(store.email);

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMatch(true);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    // Add logic to save the new password to the backend here
    // This is a placeholder and should be replaced with actual API calls
    console.log('New Password:', newPassword);
    // Close the modal and reset the state
    handleCloseModal();
  };

  const obtenerOrdenesUsuario = async (userId) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}/orders`);
      if (!response.ok) {
        throw new Error('No se pudo obtener las órdenes del usuario');
      }
      const data = await response.json();
      setUserOrders(data.orders);
    } catch (error) {
      console.error('Error al obtener las órdenes del usuario:', error);
    }
  };

  useEffect(() => {
    setPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (categoriaSeleccionada === 'Ordenes') {
      obtenerOrdenesUsuario(store.userId);
    }
  }, [categoriaSeleccionada, store.userId]);

  const getProductNameById = (productId) => {
    const product = store.productos.find(item => item.id === productId);
    return product ? product.name : 'Producto Desconocido';
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
          <span className={`opcion ${categoriaSeleccionada === 'Perfil' ? 'active' : ''}`} onClick={() => handleCategoriaSeleccionada('Perfil')}>
            Ver mi perfil
          </span>
          <span className={`opcion ${categoriaSeleccionada === 'Ordenes' ? 'active' : ''}`} onClick={() => handleCategoriaSeleccionada('Ordenes')}>
            Ver mis órdenes
          </span>
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
            <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {userOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.timestamp}</td>
            <td>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product_id}>
                  {item.quantity}- {getProductNameById(item.product_id)}
                  </li>
                ))}
              </ul>
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
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" value={store.email} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input type="password" className={`form-control ${passwordMatch ? '' : 'is-invalid'}`} id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {!passwordMatch && <div className="invalid-feedback">Las contraseñas no coinciden.</div>}
            </div>
            <Button variant="light mt-3" type="button" onClick={handleSaveChanges} disabled={!passwordMatch}>
              Guardar cambios
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
