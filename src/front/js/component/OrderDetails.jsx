import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <Modal show={!!order} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {order && (
          <>
            <p className="mb-2"><strong>ID de la Orden:</strong> {order.id}</p>
            <p className="mb-2"><strong>Fecha:</strong> {order.timestamp}</p>
            <p className="mb-2"><strong>Estado de Pago:</strong> {order.payment_status}</p>
            <h3>Elementos de la Orden:</h3>
            <ul className="list-unstyled">
              {order.items.map((item, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Nombre del Producto:</strong> {item.product_name}</p>
                  <p><strong>Cantidad:</strong> {item.quantity}</p>
                  <p><strong>Costo Total con Extras:</strong> ${item.cost_with_extras.toFixed(2)}</p>
                  <p><strong>Costo Total sin Extras:</strong> ${item.cost_without_extras.toFixed(2)}</p>
                  <h4>Extras:</h4>
                  <ul>
                    {item.extras.map((extra, extraIndex) => (
                      <li key={extraIndex} className="mb-2">
                        <p><strong>Nombre del Extra:</strong> {extra.name}</p>
                        <p><strong>Precio del Extra:</strong> ${extra.price.toFixed(2)}</p>
                        <p><strong>Tipo de Extra:</strong> {extra.type}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn btn-dark "onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
