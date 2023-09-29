import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegisterModal from './register';
import { Context } from "../store/appContext";

export const Login = ({ showModal, handleCloseModal }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(null);
  const { actions } = useContext(Context);
  const { login } = actions; // Desestructura la acción de login desde tus acciones de Flux

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  useEffect(() => {
    if (loginSuccess === true) {
      setSuccessMessage('Inicio de sesión exitoso');
      setTimeout(() => {
        handleCloseModal();
        setSuccessMessage('');
        setLoginSuccess(null);
      }, 2000);
    } else if (loginSuccess === false) {
      setSuccessMessage('Error en el inicio de sesión');
      setTimeout(() => {
        setSuccessMessage('');
        setLoginSuccess(null);
      }, 2000);
    }
  }, [loginSuccess]);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Introduce un correo electrónico válido')
      .required('Campo obligatorio'),
    password: Yup.string()
      .min(8, 'Debe tener 8 caracteres o más')
      .required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values.email, values.password); // Usar la acción de login
        if (result && result.success) {
          setLoginSuccess(true);
        } else {
          setLoginSuccess(false);
        }
      } catch (error) {
        setLoginSuccess(false);
      }
    },
  });

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          handleCloseModal();
          setSuccessMessage(''); // Limpiar el mensaje al cerrar el modal
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                aria-describedby="emailHelp"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              <label className="form-label" htmlFor="email">
                Correo electrónico
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control form-control-lg"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
            </div>
            <div className="pt-1 mb-4">
              <button
                className="btn btn-secondary btn-lg"
                style={{ marginRight: '30px' }}
                type="submit"
              >
                Ingresar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleShowRegisterModal}
              >
                Crear cuenta
              </button>
            </div>
            {successMessage && (
              <p className={loginSuccess ? 'text-success' : 'text-danger'}>
                {successMessage}
              </p>
            )}
          </form>
        </Modal.Body>
      </Modal>
      <RegisterModal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} />
    </>
  );
};

export default Login;
