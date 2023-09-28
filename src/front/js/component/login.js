import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = ({ showModal, handleCloseModal, handleSubmit, successMessage }) => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('Requerido'),
    password: Yup.string().min(8, 'Debe tener al menos 8 caracteres').required('Requerido')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      handleSubmit(values.email, values.password);
    },
  });

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
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
              aria-activedescendant="emailHelp"
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
            <button className="btn btn-info btn-lg btn-block" type="submit">
              Iniciar sesión
            </button>
          </div>
          {successMessage && <p>{successMessage}</p>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
