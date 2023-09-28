import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Pruebas } from "./Prueba.jsx"


import CheckoutForm from "./CheckoutForm.jsx";
import "./App.css";
import { Navigate } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Nsr4fKXj5LWRngyICcySMhyijuGZpNBAj1mAEgpVe96QSXP0c3wT3W2kA7T1nzikklh0UqthqmLvYqh7JY9Si4O00Bkpvecrd");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [valor, setValor] = useState(1);  // Usamos el estado de React para manejar la cantidad
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [total_Presio, setTotal_Presio] = useState();



  function sumarPro() {
    setValor(valor + 1);
  }

  function restarPro() {
    if (valor > 1) {
      setValor(valor - 1);
    }
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.BACKEND_URL}api/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "items": store.cart.totalCost }),
    })

      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
    // .then((data) => console.log(data));
  }, []);

  // useEffect(() => {
  //   actions.CargarPago()
  // }, []);

  console.log("W2ww => ", store.cart.totalCost)


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  console.log("este =" + clientSecret)


  // function mover_carrito() {
  //   navigate("/prueba1122")
  // }

  // let prueba = {}

  // store.cart.items.extras.map((item, index) => (

  //   prueba = item.name

  // ))
  // let Producto_compra
  // store.cart.items.map((item, index) => (

  // ))

  // const Producto_compra = store.cart.items[3].extras == [] ? <div key={index}>sin Extras</div>
  //   : <div key={index}>con Extras</div>




  // const Producto_compra = store.cart.items.map((item, index) => (
  //   <Pruebas key={index} />
  // ))


  console.log(" => ", store.cart.totalCost)

  return (

    <div className="body_home" id="body_prueba">

      <div className="">

      </div>
      <div className="row m-auto contenedor_padre_app">

        <div className="col-6 div_izquierda item">
          <div className="col-12">
            <div className="row col-12 contenedor_T_izquierda">
              <div className="col-12 contenedor_productos">
                <div className="row col-12 padre_Pr_indi">

                  {/* {Producto_compra} */}

                  {store.cart.items.map((item, index) => (

                    <Pruebas key={index}
                      name={item.name}
                      price={item.price}
                      extras={item.extras}
                      cost={item.cost}
                      quantity={item.quantity}
                      order_id={item.order_id}
                      product_id={item.product_id}

                    />

                  ))
                  }
                  {/* {Producto_compra} */}
                  {/* {store.cart.items.extras == null
                    ? store.cart.items.map((item, index) => (

                      <div>sin extras</div>


                    ))
                    : store.cart.items.map((item, index) => (

                      <div>con Extras</div>


                    ))



                  } */}




                  {/* {store.cart.items.map((item, index) => (

                    if (store.cart.items[index].extras) {
                      
                    }

                  ))} */}

                </div>

              </div>
              <div className="col-12 cont_Sub">
                <div className="row cont_Sub_1">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 title_sub">Sub total</div>
                      <div className="col-6 price_Sub">
                        {store.cart.totalCost}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12">
                    <div className="row">
                      <div className="col-6 title_sub">Code Discount</div>
                      <div className="col-6 price_code">
                        <div className="col-6 price_Sub">
                          MRDF
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>



              <div className="col-12 cont_total">
                <div className="row">

                  <div className="col-6 title_T">Totall</div>
                  <div className="col-6 price_Sub">
                    <div className="input-group ">
                      <span className="input-group-text">$</span>
                      <input type="number" value={store.cart.totalCost} className="form-control preciototal" id="Input_Total" aria-label="Amount (to the nearest dollar)" readOnly />

                      {/* <span className="input-group-text"></span> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-6 text-center div_derecha item">
          < div className="row " >
            {/* <div className="col-6 bg-danger">
              1 of 3
            </div> */}
            {/* <div className="col-12 bg-danger detalle_com">
              <strong>Detalles de compra</strong>
            </div> */}


            {/* <div className="col ">
              3 of 3
            </div> */}
            <div className="col-12 App" >
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}

            </div >
            {/* <div className="row">
              <div className="col bg-dark">
                1 of 3
              </div>
              <div className="col-5 bg-secondary">
                2 of 3 (wider)
              </div>
              <div className="col bg-info">
                3 of 3
              </div>
            </div> */}
          </div >
        </div >


      </div>
    </div>
  );
}