import React ,{useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";


const Login =()=> {

    const navigate = useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const{store, actions}= useContext(Context)

     async function handleSubmit(e) {
       e.preventDefault();
       let logged = await actions.login(email,password);
       if (logged === true) {
        navigate('/')
       }
       
   }
   
    return(
       
    <div className="formulario text-center">
    <form className="" onSubmit={handleSubmit}>
      <label className="text-white mt-2" htmlFor="email">Correo electrónico:</label>
      <br />
      <input className="mt-3"
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <label className="text-white mt-2" htmlFor="password">Contraseña:</label>
      <br />
      <input className="mt-3"
        type="password"
        name="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <input className="m-4" type="submit" value="Iniciar sesión" />
    </form>
  </div>
    )
}


export default Login