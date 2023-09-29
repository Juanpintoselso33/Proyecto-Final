import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <Modal show={!!order} onHide={onClose} size="lg">
      
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Orden</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container mt-6 mb-7">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div style={{ border: '1px solid rgba(30,46,80,.09)', boxShadow: '0 20px 27px 0 rgb(0 0 0 / 5%)' }}>
                <div style={{ padding: '3rem' }}>
                  {order && (
                    <>
                      <div className="border-top border-gray-200 pt-4 mt-4">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="text-muted mb-2">ID de la Orden</div>
                            <strong>{order.id}</strong>
                          </div>
                          <div className="col-md-6 text-md-end">
                            <div className="text-muted mb-2">Fecha</div>
                            <strong>{order.timestamp}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="border-top border-gray-200 mt-4 py-4">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="text-muted mb-2">Estado de Pago</div>
                            <strong className={order.payment_status === 'Pendiente' ? 'text-warning' : ''}>{order.payment_status}</strong>
                          </div>
                        </div>
                      </div>
                      <table className="table border-bottom border-gray-200 mt-3">
                        <thead>
                          <tr>
                            <th scope="col">Nombre del Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Costo sin Extras</th>
                            <th scope="col">Costo Total con Extras</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.product_name}
                                {item.extras && item.extras.length > 0 && (
                                  <ul>
                                    {item.extras.map((extra, i) => (
                                      <li key={i}>{typeof extra === 'object' ? extra.name : extra}</li>
                                    ))}
                                  </ul>
                                )}
                              </td>
                              <td>{item.quantity}</td>
                              <td>${item.cost_without_extras.toFixed(2)}</td>
                              <td>${item.cost_with_extras.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                            <td className="text-end"><strong style={{ fontSize: '1.2em' }}>${order.total_cost_with_extras.toFixed(2)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn btn-dark" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default OrderDetailsModal;