import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

export const RegisterModal = ({ show, onHide }) => {
  const { actions } = useContext(Context);
  const [isRegistered, setIsRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Introduce un correo electrónico válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'Debe tener 8 caracteres o más')
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña'),
    role: isAdmin ? Yup.string().required('El rol es obligatorio') : null,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Intenta registrar al usuario
        const response = await actions.registerUser(values);

        if (response) {
          if (response.success) {
            setIsRegistered(true);
            setSuccessMessage('Registro exitoso'); // Mensaje de éxito
            setErrorMessage('');

            // Cierra el modal después de 2 segundos (2000 ms)
            setTimeout(() => {
              onHide();
            }, 2000);
          } else {
            setErrorMessage(response.error || 'El registro no se pudo completar'); // Muestra el mensaje de error del servidor o uno genérico
            setSuccessMessage('');
          }
        } else {
          setErrorMessage('El registro no se pudo completar'); // Muestra un mensaje de error general
          setSuccessMessage('');
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
        setErrorMessage('Solicitud inválida: Verifica tus datos e inténtalo nuevamente');
        setSuccessMessage('');
      }
    },
  });

  useEffect(() => {
    const loginAfterRegister = async () => {
      if (isRegistered && !isAdmin) {
        try {
          await actions.loginUser(formik.values.email, formik.values.password);
          onHide();
        } catch (error) {
          console.error('Error durante el inicio de sesión:', error);
        }
      }
    };
  
    loginAfterRegister();
  }, [isRegistered, actions, formik.values.email, formik.values.password, onHide]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isAdmin ? 'Agregar Usuario' : 'Registro'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <p className="text-success">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-danger">{errorMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control form-control-lg ${
                formik.errors.email && formik.touched.email ? 'is-invalid' : ''
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="email">
              Correo electrónico
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control form-control-lg ${
                formik.errors.password && formik.touched.password ? 'is-invalid' : ''
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control form-control-lg ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? 'is-invalid'
                  : ''
              }`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>
          {isAdmin && (
            <div className="form-outline mb-4">
              <label className="form-label">Rol</label>
              <select
                name="role"
                className="form-control"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              {formik.errors.role && formik.touched.role && (
                <div className="invalid-feedback">{formik.errors.role}</div>
              )}
            </div>
          )}
          <div className="pt-1 mb-4">
            <button className="btn btn-info btn-lg btn-block" type="submit">
              {isAdmin ? 'Agregar Usuario' : 'Registro'}
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
