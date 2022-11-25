import React, { useState, useEffect, Fragment } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../services/payment-service';
import { createOnlinePaymentOrder, emptyUserCart } from '../../services/user-service';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { ADD_TO_CART, COUPON_APPLIED } from '../../reducers/actions/types';
import Checkout from '../../images/checkout.png';

const cardStyle = {
	style: {
		base: {
			color: '#32325d',
			fontFamily: 'Arial, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#32325d',
			},
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
};

const paymentInfoInitState = {
	cartTotal: 0,
	totalAfterDiscount: 0,
	payable: 0,
};

const StripeCheckout = ({ history }) => {
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');
	const [paymentInfo, setPaymentInfo] = useState(paymentInfoInitState);

	const { user, coupon } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		createPaymentIntent(user.token, coupon).then((res) => {
			const { clientSecret, cartTotal, totalAfterDiscount, payable } = res.data;
			setClientSecret(clientSecret);
			setPaymentInfo({ cartTotal, totalAfterDiscount, payable });
		});
	}, []);

	const handPaymentSubmit = async (e) => {
		console.log(e.target.value);
		e.preventDefault();
		setProcessing(true);
		const paymentData = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value,
				},
			},
		});

		if (paymentData.error) {
			setError(`Proceed payment failed: ${paymentData.error.message}`);
			setProcessing(false);
		} else {
			createOnlinePaymentOrder(paymentData, user.token).then((res) => {
				if (res.data.orderCreated) {
					if (typeof window !== 'undefined') localStorage.removeItem('cart');
					dispatch({
						type: ADD_TO_CART,
						payload: [],
					});
					dispatch({
						type: COUPON_APPLIED,
						payload: false,
					});
					emptyUserCart(user.token);
				}
			});
			console.log(JSON.stringify(paymentData, null, 4));
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};
	const handPaymentChange = (e) => {
		//TODO: card element change listner/ display errors
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	};

	return (
		<Fragment>
			{!succeeded && (
				<div>
					{coupon && paymentInfo.totalAfterDiscount !== undefined ? (
						<p className='alert alert-success'>{`Total after discount: $${paymentInfo.totalAfterDiscount}`}</p>
					) : (
						<p className='alert alert-info'>NO COUNPON APPLIED</p>
					)}
				</div>
			)}
			<form
				id='payment-form'
				className='stripe-form'
				onSubmit={handPaymentSubmit}>
				<div className='text-center'>
					<Card
						className='pb-2'
						cover={
							<img
								src={Checkout}
								style={{ height: '200px', objectFit: 'scale-down', marginBottom: '-40px' }}
							/>
						}
						actions={[
							<Fragment>
								<DollarOutlined className='text-info' /> Total Payment: $
								{paymentInfo.cartTotal.toFixed(2)}
							</Fragment>,
							<Fragment>
								<CheckOutlined className='text-success' /> Payment Discount: $
								{(paymentInfo.payable / 100).toFixed(2)}
							</Fragment>,
						]}
					/>
				</div>
				<CardElement
					id='card-element'
					options={cardStyle}
					onChange={handPaymentChange}
				/>
				<button
					className='stripe-button'
					disabled={processing || disabled || succeeded}>
					<span id='button-text'>
						{processing ? (
							<div
								className='spinner'
								id='spinner'
							/>
						) : (
							'Submit Payment'
						)}
					</span>
				</button>
				<br />
				{error && (
					<div
						className='card-error text-danger'
						role='alert'>
						{error}
					</div>
				)}
				<br />
				<p className={succeeded ? 'result-message' : 'result-message hidden'}>
					Payment Successful. <Link to='/user/history'>Visit purchase history.</Link>
				</p>
			</form>
		</Fragment>
	);
};

export default StripeCheckout;
