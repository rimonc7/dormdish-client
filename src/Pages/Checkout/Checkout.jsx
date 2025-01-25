import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useContext, useState, useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UseUser from "../../Hook/UseUser";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { packageName } = useParams()
    const location = useLocation();
    const { price } = location.state || {};
    const [userDb, isUserLoading, refetch] = UseUser();


    const currentUser = userDb?.find(usr => usr.email === user.email)
    console.log(currentUser)

    useEffect(() => {
        if (price > 0) {
            axiosPublic.post('/create-checkout-session', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosPublic, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (!stripe || !elements) {
            setLoading(false);
            setErrorMessage("Stripe has not loaded yet. Please try again.");
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setLoading(false);
            setErrorMessage("Payment information is incomplete.");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.error("Payment Error", error);
            setErrorMessage(error.message);
            setLoading(false);
        } else {

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            });

            if (error) {
                setErrorMessage(error.message);
                setLoading(false);
            } else {
                console.log('Payment Intent:', paymentIntent);
                if (paymentIntent.status === 'succeeded') {
                    setTransactionId(paymentIntent.id);
                    setLoading(false);
                    const payment = {
                        email: user.email,
                        price,
                        badge: packageName,
                        transactionId: paymentIntent.id,
                        date: new Date(),
                    };

                    const res = await axiosPublic.post('/payments', payment);
                    if (res.data?.paymentResult?.insertedId) {
                        Swal.fire({
                            title: "Payment Success",
                            icon: "success",
                            draggable: true
                        });

                        const packageInfo = {
                            packageName
                        }
                        axiosPublic.patch(`/users/badge/${currentUser._id}`, packageInfo)
                            .then(res => {
                                if (res.data.modifiedCount > 0) {
                                    // Swal.fire("Status Updated", "", "success");
                                }
                            })
                    }
                }
            }
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div className="border border-gray-300 rounded-md p-3">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                        },
                                        invalid: {
                                            color: "#9e2146",
                                        },
                                    },
                                }}
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm">{errorMessage}</p>
                        )}
                        <button
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={!stripe || !clientSecret || loading}
                        >
                            {loading ? "Processing..." : "Pay"}
                        </button>
                        {transactionId && (
                            <p className="text-green-600">
                                Your Transaction ID: {transactionId}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
