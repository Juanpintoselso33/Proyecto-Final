import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css"
export const ConfirmationPage = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Intenta obtener la orden desde el almacenamiento local
        const storedOrder = localStorage.getItem("order");

        // Si no existe la orden en el almacenamiento local, muestra un mensaje de error
        if (!storedOrder) {
            return setOrder(null);
        }

        // Si la orden existe, convierte el JSON almacenado en un objeto
        const parsedOrder = JSON.parse(storedOrder);

        setOrder(parsedOrder);
    }, []);

    return (
        <div className="pagina_conf">
            <h2>Página de Confirmación</h2>
            {order ? (
                <div>
                    {/* Renderiza los detalles de la orden dentro de una caja con estilo de Bootstrap */}
                    <div className="alert alert-success" role="alert">
                        <h3>Detalles de la Orden</h3>
                        <p><strong>ID de la Orden:</strong> {order.id}</p>
                        <p><strong>Fecha:</strong> {order.timestamp}</p>
                        <p><strong>Estado de Pago:</strong> {order.payment_status}</p>
                        <h4>Elementos de la Orden:</h4>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    <p><strong>Nombre del Producto:</strong> {item.product_name}</p>
                                    <p><strong>Cantidad:</strong> {item.quantity}</p>
                                    <p><strong>Costo Total con Extras:</strong> ${item.cost_with_extras.toFixed(2)}</p>
                                    <p><strong>Costo Total sin Extras:</strong> ${item.cost_without_extras.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Renderiza un enlace que te lleva al inicio y borra la orden del almacenamiento local */}
                    <Link to="/" onClick={() => localStorage.removeItem("order")} className="btn btn-primary">
                        Volver al Inicio
                    </Link>
                </div>
            ) : (
                <div>
                    {/* Renderiza un mensaje de error si la orden no existe */}
                    <p>No se encontró la orden. Ha ocurrido un error.</p>
                </div>
            )}
        </div>
    );
};

export default ConfirmationPage;
