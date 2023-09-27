import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

const RegisterModal = ({ show, onHide }) => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(formData.email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (!formData.password || formData.password.trim() === '') {
      alert('La contraseña no puede estar vacía.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const isRegistered = actions.registerUser(formData);

    if (isRegistered) {
      setSuccessMessage("Registro exitoso, cerrando ventana...");
      setTimeout(() => {
        onHide();
        setSuccessMessage("");
      }, 2000);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <div>{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example18"
              name="email"
              className="form-control form-control-lg"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example18">
              Email address
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example28"
              name="password"
              className="form-control form-control-lg"
              value={formData.password}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example28">
              Password
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example38"
              name="confirmPassword"
              className="form-control form-control-lg"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example38">
              Confirm Password
            </label>
          </div>
          <div className="pt-1 mb-4">
            <button className="btn btn-info btn-lg btn-block" type="submit">
              Register
            </button>
          </div>
          <p className="small mb-5 pb-lg-2">
            <a className="text-muted" href="#!">
              Forgot password?
            </a>
          </p>
          <p>
            Already have an account?{" "}
            <a href="#!" className="link-info">
              Login here
            </a>
          </p>
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
