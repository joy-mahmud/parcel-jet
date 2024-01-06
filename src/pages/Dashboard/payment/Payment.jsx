import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
const Payment = () => {
    return (
        <div className="mx-[150px]">
           <SectionTitle Heading={'payment'} subHeading={'please pay here'}></SectionTitle> 
           <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
           </div>
        </div>
    );
};

export default Payment;