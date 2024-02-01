import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import authAxios from "../../services/authAxios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function Payment({paymentDetails}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const userAttributes = useSelector(state => state.user?.user);

  useEffect(() => {
    authAxios.get('config').then(res => {
        const { publishableKey } = res.data;
        setStripePromise(loadStripe(publishableKey));
    }).catch(error => {
        console.log(error.message);
    });
  }, []);

  useEffect(() => {
    const payload = {
        name: userAttributes?.name,
        email: userAttributes?.email,
        paymentMethodType: paymentDetails?.paymentMethodType,
        currency: 'USD',
        amount: paymentDetails?.amount,
    }
    authAxios.post('create-checkout-session', payload).then(res => {
        let { clientSecret } = res.data;
        setClientSecret(clientSecret);
    }).catch(error => {
        console.log(error)
        if (error?.response?.data) {
          toast.info(`${error?.response?.data?.message}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
          });
        }
    });
  }, [userAttributes, paymentDetails?.paymentMethodType, paymentDetails?.amount]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={ options }>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;