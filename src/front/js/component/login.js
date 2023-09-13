import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logged = await actions.login(email, password);

    if (logged) {
      // Puedes redirigir al usuario a una página de bienvenida aquí si el inicio de sesión es exitoso
    }
  };

  return (
    <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
      <h3 className="fw-normal mb-3 pb-3 d-flex justify-content-center" style={{ letterSpacing: "1px" }}>
        Log in
      </h3>

      <div className="form-outline mb-4">
        <input
          type="email"
          id="form2Example18"
          className="form-control form-control-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="form2Example18">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example28"
          className="form-control form-control-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="form2Example28">
          Password
        </label>
      </div>

      <div className="pt-1 mb-4">
        <button className="btn btn-info btn-lg btn-block" type="submit">
          Login
        </button>
      </div>

      <p className="small mb-5 pb-lg-2">
        <a className="text-muted" href="#!">
          Forgot password?
        </a>
      </p>
      <p>
        Don't have an account? <a href="#!" className="link-info">Register here</a>
      </p>
    </form>
  );
};
