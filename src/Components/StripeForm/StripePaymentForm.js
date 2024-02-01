import React from 'react';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function StripePaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
        });

        if (result.error) {
            console.error(result.error);
        } else {
            console.log(result.paymentMethod);
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button disabled={!stripe}>Submit</button>
            </form>
        </Elements>
    );
}

export default StripePaymentForm;
