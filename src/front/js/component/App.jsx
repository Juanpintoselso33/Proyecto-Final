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



    <div class="col-6 text-center">
      < div class="row  " >
        <div class="col-6 bg-danger">
          1 of 3
        </div>
        <div class="col-6 bg-danger">
          1 of 3
        </div>
        <div class="col-12  producto_indi">

          <div className="row justify-content-between home_dentro">
            <div className="row col-10 pepe2  pepe2 ">
              <div className="col-6 imagenP">
                <img src="https://th.bing.com/th/id/R.033c8f01fbb84af4c5a55a3cbac42404?rik=%2bib7SrOYugiI%2bg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-61BeHL1BdSo%2fTyKUcPwqfOI%2fAAAAAAAAAFA%2fr5X62fe8dRk%2fs1600%2fhamburguesa2.jpg&ehk=ro3LnT%2fFb%2fnjUfTdHupjmVvqBxsYOoorcmQnYdpuXt8%3d&risl=&pid=ImgRaw&r=0" alt="" />
              </div>
              <div className="col-6 d-flex padrNom_des">
                <div className="nom_des">
                  <div className="col-12">
                    name
                  </div >
                  <div className="col-12">
                    detalle
                  </div >
                </div>
                <div className="col-12">
                  <strong>    - 2 +  </strong>
                </div>
              </div>
            </div>
            <div className="row col-2 pepe3">

              <div className="col-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </div >
              <div className="col-12">
                $20
              </div >
            </div>

          </div>
        </div>
        <div class="col bg-primary">
          3 of 3
        </div>
        <div className="col-12 App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}

        </div >
        <div class="row">
          <div class="col bg-dark">
            1 of 3
          </div>
          <div class="col-5 bg-secondary">
            2 of 3 (wider)
          </div>
          <div class="col bg-info">
            3 of 3
          </div>
        </div>
      </div >


    </div >
  );
}