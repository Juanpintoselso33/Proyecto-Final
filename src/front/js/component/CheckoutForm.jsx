import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('jocady21@gmail.com');
  const [message, setMessage] = useState("hola mundo");
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);


  useEffect(() => {
    if (orderId) {
      const interval = setInterval(() => {
        actions.checkOrderStatus(orderId);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [orderId]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          actions.updateOrderStatus(orderId, 'Exitoso');
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const order = await actions.createOrder();
    console.log("Orden a mandar a localstorage", order);
    localStorage.setItem("order", JSON.stringify(order));    
    setTimeout(async () => {
      console.log("Orden creada en checkout", order);
      if (order && order.id) {
        setOrderId(order.id);
        console.log("Orden creada en checkout con ID", order.id);
        localStorage.setItem("order", JSON.stringify(order));    
      } else {
        console.log("La orden no se creó correctamente o no tiene un ID.");
        setIsLoading(false);
        return;
      }
    }, 10000);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://laughing-space-robot-vgqgpqxx79xcwpq6-3000.app.github.dev/confirmation',
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        await actions.updateOrderStatus(order.id, 'Exitoso');
        setMessage("El pago se realizó con éxito.");
      } else {
        setMessage("Ocurrió un error inesperado.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
