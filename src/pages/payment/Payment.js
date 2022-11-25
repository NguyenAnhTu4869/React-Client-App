import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../../components/stripe/StripeCheckout';

//Render stripe component outside to avoid re-render it everytime state update
const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripe = loadStripe(PUBLIC_KEY);

const Payment = () => {
	return (
		<div className='container p-5 text-center'>
			<h4>Complete Order</h4>
			<Elements stripe={stripe}>
				<div className='col-md-8 offset-md-2'>
					<StripeCheckout />
				</div>
			</Elements>
		</div>
	);
};

export default Payment;
