import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import "../../styles/cartDropdown.css"
export const Contacto = () => {
    const { actions, store } = useContext(Context);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [asunto, setAsunto] = useState("Comentario");
    const [mensaje, setMensaje] = useState("");
    const [estadoMensaje, setEstadoMensaje] = useState(null);

    // Actualizar el correo electrónico cuando el usuario se autentique o cierre sesión
    useEffect(() => {
        setEmail(store.isAuthenticated ? store.email : "");
    }, [store.isAuthenticated]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !asunto || !mensaje) {
            setEstadoMensaje("Todos los campos son obligatorios");
            return;
        }

        // Validación manual del correo electrónico
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!re.test(String(email).toLowerCase())) {
            setEstadoMensaje("Correo electrónico inválido");
            return;
        }

        const resultado = await actions.enviarMensaje(nombre, email, asunto, mensaje);
        if (resultado.status === 201) {
            setEstadoMensaje("Mensaje enviado exitosamente");
        } else {
            setEstadoMensaje("Hubo un error al enviar el mensaje");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 60px)', marginTop: '-30px' }}>
            <form className="text-center border p-5 rounded shadow from_contacto"  onSubmit={handleSubmit}>
                <p className="h4 mb-5">Contáctanos</p>

                {/* Nombre */}
                <div className="d-flex justify-content-center mb-5">
                    <input type="text" id="defaultContactFormName" className="form-control" placeholder="Nombre" style={{ width: '80%' }} onChange={(e) => setNombre(e.target.value)} />
                </div>

                {/* Correo Electrónico */}
                <div className="d-flex justify-content-center mb-5">
                    <input
                        type="email"
                        id="defaultContactFormEmail"
                        className="form-control"
                        placeholder="Correo Electrónico"
                        value={email}
                        readOnly={store.isAuthenticated}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '80%' }}
                    />
                </div>

                {/* Asunto */}
                <div className="mb-5">
                    <label style={{ marginRight: '10px' }}>Asunto</label>
                    <select className="browser-default custom-select" onChange={(e) => setAsunto(e.target.value)}>
                        <option value="" disabled>Elige una opción</option>
                        <option value="Comentario">Comentarios</option>
                        <option value="Error">Reportar un error</option>
                        <option value="Solicitud">Solicitud de característica</option>
                    </select>
                </div>

                {/* Mensaje */}
                <div className="form-group d-flex justify-content-center mb-5">
                    <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" placeholder="Mensaje" style={{ width: '80%' }} onChange={(e) => setMensaje(e.target.value)}></textarea>
                </div>

                {/* Botón de Enviar */}
                <button className="btn btn-dark btn-block mb-2" type="submit">Enviar</button>
                {estadoMensaje && <p style={{ color: estadoMensaje === "Mensaje enviado exitosamente" ? "green" : "red" }}>{estadoMensaje}</p>}
            </form>
        </div>
    );
};

export default Contacto;
