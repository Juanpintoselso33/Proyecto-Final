import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

const RegisterModal = ({ show, onHide }) => {
  const { actions } = useContext(Context);
  const [isRegistered, setIsRegistered] = useState(false); 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Introduce un correo electrónico válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('La contraseña es obligatoria'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirma tu contraseña'),
  });
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      actions
        .registerUser(values)
        .then(() => setIsRegistered(true)) // Set isRegistered to true after successful registration
        .catch((error) => console.error('Registration error:', error));
    },
  });

  useEffect(() => {
    const loginAfterRegister = async () => {
      if (isRegistered) {
        try {
          await actions.loginUser(formik.values.email, formik.values.password);
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };

    loginAfterRegister();
  }, [isRegistered, actions, formik.values.email, formik.values.password]);


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
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
          <div className="pt-1 mb-4">
            <button className="btn btn-info btn-lg btn-block" type="submit">
              Register
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
