import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm.jsx";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Nsr4fKXj5LWRngyICcySMhyijuGZpNBAj1mAEgpVe96QSXP0c3wT3W2kA7T1nzikklh0UqthqmLvYqh7JY9Si4O00Bkpvecrd");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [valor, setValor] = useState(1);  // Usamos el estado de React para manejar la cantidad

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
    fetch("https://symmetrical-space-lamp-r4gwxgwx9wv259gj-3001.app.github.dev/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "2000" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  console.log("este =" + clientSecret)
  return (

    <div className="body_home">

      <div className="">
        encabezado
      </div>
      <div className="row m-auto">


        <div class="col-6 text-center">
          < div class="row  " >
            {/* <div class="col-6 bg-danger">
              1 of 3
            </div> */}
            {/* <div class="col-12 bg-danger detalle_com">
              <strong>Detalles de compra</strong>
            </div> */}


            <div class="col ">
              3 of 3
            </div>
            <div className="col-12 App">
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}

            </div >
            {/* <div class="row">
              <div class="col bg-dark">
                1 of 3
              </div>
              <div class="col-5 bg-secondary">
                2 of 3 (wider)
              </div>
              <div class="col bg-info">
                3 of 3
              </div>
            </div> */}
          </div >
        </div >

        <div className="col-6 div_izquierda">
          <div className="col-10">
            <div className="row col-12 contenedor_T_izquierda">
              <div className="col-12 contenedor_productos">
                <div className="row col-12 padre_Pr_indi">
                  <div class="col-12  producto_indi">

                    <div className="row  home_dentro">
                      <div className="col-12">
                        <div className="row  pepe2  ">
                          <div className="col-4 imagenP">
                            <img src="https://th.bing.com/th/id/R.033c8f01fbb84af4c5a55a3cbac42404?rik=%2bib7SrOYugiI%2bg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-61BeHL1BdSo%2fTyKUcPwqfOI%2fAAAAAAAAAFA%2fr5X62fe8dRk%2fs1600%2fhamburguesa2.jpg&ehk=ro3LnT%2fFb%2fnjUfTdHupjmVvqBxsYOoorcmQnYdpuXt8%3d&risl=&pid=ImgRaw&r=0" alt="" />
                          </div>
                          <div className="col-8 d-flex padrNom_des">
                            <div className="row pequeño__iz">
                              <div className="col-12 arriba_M">
                                <div className="row">
                                  <div className="col-6">
                                    <div className="nom_des">
                                      <div className="col-12 Titulo_Pr">
                                        Hamburguesa Completa
                                      </div >
                                      <div className="col-12">
                                        detalle
                                      </div >
                                    </div>
                                  </div>
                                  <div className="col-6 contenedor_basura">
                                    <div className="col-12 basura">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                      </svg>
                                    </div >
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 abajo_M">
                                <div className="row input_M">
                                  <div className="col-6">
                                    <div className="container">


                                      <div class="row prueba">
                                        <div className="wrapper">
                                          <span className="minus" onClick={restarPro}>-</span>
                                          <span className="num">{valor}</span>
                                          <span className="plus" onClick={sumarPro}>+</span>
                                        </div>
                                      </div>

                                      {/* <div className="elcon"> */}

                                      {/* <button type="button" id="decrement">-</button>
                                <input type="number" min="1" max="10" step="5"
                                  value="2" id="my-input" readOnly />
                                <button type="button" id="increment">+</button> */}
                                      {/* </div> */}
                                    </div>
                                  </div>
                                  <div className="col-6 precio_M">
                                    <div className="preciosito">
                                      <strong>$200</strong>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>


                    </div>


                  </div>


                  <div class="col-12  producto_indi">

                    <div className="row  home_dentro">
                      <div className="col-12">
                        <div className="row  pepe2  ">
                          <div className="col-4 imagenP">
                            <img src="https://th.bing.com/th/id/R.033c8f01fbb84af4c5a55a3cbac42404?rik=%2bib7SrOYugiI%2bg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-61BeHL1BdSo%2fTyKUcPwqfOI%2fAAAAAAAAAFA%2fr5X62fe8dRk%2fs1600%2fhamburguesa2.jpg&ehk=ro3LnT%2fFb%2fnjUfTdHupjmVvqBxsYOoorcmQnYdpuXt8%3d&risl=&pid=ImgRaw&r=0" alt="" />
                          </div>
                          <div className="col-8 d-flex padrNom_des">
                            <div className="row pequeño__iz">
                              <div className="col-12 arriba_M">
                                <div className="row">
                                  <div className="col-6">
                                    <div className="nom_des">
                                      <div className="col-12 Titulo_Pr">
                                        Hamburguesa Completa
                                      </div >
                                      <div className="col-12">
                                        detalle
                                      </div >
                                    </div>
                                  </div>
                                  <div className="col-6 contenedor_basura">
                                    <div className="col-12 basura">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                      </svg>
                                    </div >
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 abajo_M">
                                <div className="row input_M">
                                  <div className="col-6">
                                    <div className="container">


                                      <div class="row prueba">
                                        <div className="wrapper">
                                          <span className="minus" onClick={restarPro}>-</span>
                                          <span className="num">{valor}</span>
                                          <span className="plus" onClick={sumarPro}>+</span>
                                        </div>
                                      </div>

                                      {/* <div className="elcon"> */}

                                      {/* <button type="button" id="decrement">-</button>
                                <input type="number" min="1" max="10" step="5"
                                  value="2" id="my-input" readOnly />
                                <button type="button" id="increment">+</button> */}
                                      {/* </div> */}
                                    </div>
                                  </div>
                                  <div className="col-6 precio_M">
                                    <div className="preciosito">
                                      <strong>$200</strong>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>


                    </div>


                  </div>
                </div>

              </div>
              <div className="col-12 cont_Sub">
                <div className="row cont_Sub_1">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 title_sub">Sub total</div>
                      <div className="col-6 price_Sub">
                        "$250"
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 title_sub">Code Discount</div>
                      <div className="col-6 price_code">
                        <div className="col-6 price_Sub">
                          MRDF
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-12 cont_total">
                <div className="row">

                  <div className="col-6 title_T">Totall</div>
                  <div className="col-6 price_Sub">
                    <div class="input-group ">
                      <span class="input-group-text">$</span>
                      <input type="number" class="form-control" id="Input_Total" aria-label="Amount (to the nearest dollar)" readonly />

                      <span class="input-group-text">.00</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}