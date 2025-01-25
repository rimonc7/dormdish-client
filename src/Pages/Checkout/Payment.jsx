import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Checkout from "./Checkout";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); // Load Stripe key
    return (
        <div className="pt-24 px-4 md:px-16">
            <SectionTitle heading={'Payment'} />
            <div className="text-center mx-36 mt-10">
                <Elements stripe={stripePromise}>
                    <Checkout />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
