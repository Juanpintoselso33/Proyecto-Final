import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

export const RegisterModal = ({ show, onHide }) => {
  const { actions } = useContext(Context);
  const [isRegistered, setIsRegistered] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Introduce un correo electrónico válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('La contraseña es obligatoria'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirma tu contraseña'),
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
    onSubmit: (values) => {
      actions
        .registerUser(values)
        .then(() => setIsRegistered(true))
        .catch((error) => console.error('Registration error:', error));
    },
  });

  useEffect(() => {
    const loginAfterRegister = async () => {
      if (isRegistered && !isAdmin) {  // Agregamos la condición !isAdmin aquí
        try {
          await actions.loginUser(formik.values.email, formik.values.password);
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };
  
    loginAfterRegister();
  }, [isRegistered, actions, formik.values.email, formik.values.password, isAdmin]);  // Agregamos isAdmin como dependencia
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isAdmin ? 'Agregar Usuario' : 'Registro'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example18"
              name="email"
              className={`form-control form-control-lg ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="form2Example18">
              Email address
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example28"
              name="password"
              className={`form-control form-control-lg ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="form2Example28">
              Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example38"
              name="confirmPassword"
              className={`form-control form-control-lg ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''}`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="form2Example38">
              Confirm Password
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
