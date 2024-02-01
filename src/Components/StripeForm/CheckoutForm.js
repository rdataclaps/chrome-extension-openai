import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateReceiptData } from "../../redux/actions/receiptActions";
import { getUser } from "../../redux/actions/authActions";

function formatDateToDdMmmYyyy(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      // confirmParams: {
      //   return_url: `${window.location.origin}/completion`,
      // },
    });

    if (error) {
      toast.info(`${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 2000
      });
      let currentDate = new Date();
      let pd = formatDateToDdMmmYyyy(currentDate)
      dispatch(updateReceiptData({
        paymentDate: pd,
        status: 'failed',
        step: "third"
      }));
      dispatch(getUser());
    } else {
      console.log("success")
      let currentDate = new Date();
      let pd = formatDateToDdMmmYyyy(currentDate)
      dispatch(updateReceiptData({
        paymentDate: pd,
        status: 'success',
        step: "third"
      }));
      dispatch(getUser());
    }

    setIsProcessing(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
    card: {
      iconStyle: "default",
      style: {
        base: {
          iconColor: "#666EE8",
          color: "#31325F",
          fontWeight: 400,
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": {
            color: "#fce883",
          },
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE",
        },
      },
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target?.value)}
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions}/>
      {/* <CardElement id="card-element" options={paymentElementOptions} /> */}
      <br/>
      {/* <input
        type="text"
        placeholder="Cardholder's Name"
        onChange={(e) => setName(e.target.value)}
      /> */}
      <br />
      <button className="btn" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}