import React, { useState, useContext } from 'react';
import { Link,  Navigate  } from "react-router-dom";
import { Context } from '../store/appContext';

export const AddUsuario = () => {
  const { actions, store } = useContext(Context);
  const isAdminUser = store.isAdmin;

  if (!isAdminUser) {
    return <Navigate to="/" />;
  }
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password || !userData.role) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Call the function to register a user
    actions.registerUser(userData);

    // Show success message
    alert('Usuario agregado exitosamente.');

    // Redirect back
    window.history.back();
  };

  return (
    <section className="vh-100 bg-image bg-light">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-9 col-xl-6">
              <div style={{ borderRadius: '15px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="p-5">
                  <h2 className="text-uppercase text-center mb-5">Add a User</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <Link to="/usuarioAdmin" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                        <button>Cerrar</button>
                      </Link>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Email</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Password</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Role</label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};