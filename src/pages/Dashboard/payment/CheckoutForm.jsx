import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const { data: cart, refetch, isPending } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/due/${user?.email}`)
            const totalPrice = res.data.reduce((total, item) => total + item.price, 0)
            const cartItems = res.data
            return { cartItems, totalPrice }
        }
    })
    const { data } = useQuery({
        queryKey: ['paymentIntent', user?.email],
        enabled: !isPending,
        queryFn: async () => {
            if (cart.totalPrice > 0) {
                const res = await axiosSecure.post('/create-payment-intent', { price: cart.totalPrice })
                if (res.data) {
                    setClientSecret(res.data.clientSecret)
                }
            }
            else{
                return null
            }

        }
    })
    // useEffect(() => {
    //     if (isPending) {
    //         return
    //     }
    //     else if (cart.totalPrice > 0) {
    //         axiosSecure.post('/create-payment-intent', { price: cart.totalPrice })
    //             .then(res => {
    //                 console.log(res.data.clientSecret)
    //                 setClientSecret(res.data.clientSecret)
    //             })
    //     }

    // }, [isPending, axiosSecure, cart.totalPrice])
    if (isPending) {
        return <h2>loading</h2>
    }
    console.log(clientSecret)


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
            console.log(error)
        }
        else {
            console.log(paymentMethod)
            setError('')
        }
        //confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user.email,
                price: cart.totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.cartItems.map(item => item._id),
                status: 'pending'

            }
            const res = await axiosSecure.post('/payments', payment)
            console.log(res.data)
            refetch()
            const paymentUpdate = {
                cartIds: cart.cartItems.map(item => item._id),
                pay_status: 'paid'
            }
            const res2 = await axiosSecure.patch(`/cart/paid/${user.email}`, paymentUpdate)
            console.log(res2)
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment is successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/paymentHistory')
            }

        }

    }
    return (
        <div>
            <SectionTitle heading={'payment'}></SectionTitle>
            <h2 className="my-5 text-3xl font-bold">Total amount:{cart?.totalPrice}$</h2>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#42770',
                                '::placeholder': {
                                    color: '#aab7c4'
                                }
                            },
                            invalid: {
                                color: '#9e2146'
                            }
                        }
                    }}

                ></CardElement>
                <div className="text-center my-5"><button className="btn btn-primary w-1/4" type="submit" disabled={!stripe || !clientSecret}>pay</button>
                    <p className="text-red-500 mt-5 font-semibold">{error}</p>
                    {
                        transactionId && <p className="text-green-500 text-xl font-semibold"> Transaction id: {transactionId}</p>
                    }
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;