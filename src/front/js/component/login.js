// import React, { useState } from 'react';

// const LoginModal = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aquí puedes manejar la lógica para iniciar sesión con los datos del formulario
//     console.log('Login data submitted:', formData);
//   };

//   const { email, password } = formData;

//   return (
//     <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
//       <h3 className="fw-normal mb-3 pb-3 d-flex justify-content-center" style={{ letterSpacing: "1px" }}>
//         Log in
//       </h3>

//       <div className="form-outline mb-4">
//         <input
//           type="email"
//           id="form2Example18"
//           name="email"
//           className="form-control form-control-lg"
//           value={email}
//           onChange={handleChange}
//         />
//         <label className="form-label" htmlFor="form2Example18">
//           Email address
//         </label>
//       </div>

//       <div className="form-outline mb-4">
//         <input
//           type="password"
//           id="form2Example28"
//           name="password"
//           className="form-control form-control-lg"
//           value={password}
//           onChange={handleChange}
//         />
//         <label className="form-label" htmlFor="form2Example28">
//           Password
//         </label>
//       </div>

//       <div className="pt-1 mb-4">
//         <button className="btn btn-info btn-lg btn-block" type="submit">
//           Login
//         </button>
//       </div>

//       <p className="small mb-5 pb-lg-2">
//         <a className="text-muted" href="#!">
//           Forgot password?
//         </a>
//       </p>
//       <p>
//         Don't have an account? <a href="#!" className="link-info">Register here</a>
//       </p>
//     </form>
//   );
// };

// export default LoginModal;