import React from 'react';

const PaymentInfo = ({ order, showStatus = true }) => {
	let orderStatusClazzName = '';

	switch (order.orderStatus) {
		case 'NOT PROCESSED':
			orderStatusClazzName = 'bg-secondary text-light';
			break;
		case 'PROCESSING':
			orderStatusClazzName = 'bg-info text-light';
			break;
		case 'DISPATCHED':
			orderStatusClazzName = 'bg-primary text-light';
			break;
		case 'CANCELED':
			orderStatusClazzName = 'bg-danger text-light';
			break;
		case 'COMPLETED':
			orderStatusClazzName = 'bg-success text-light';
			break;
		case 'CASH ON DELIVERY':
			orderStatusClazzName = 'bg-success text-dark';
			break;
	}

	return (
		<div className='pb-2'>
			<span>
				<b>Order ID: </b>
				{order._id}
			</span>
			<br />
			<span>
				<b>Transaction ID: </b>
				{order.paymentData.paymentIntent.id}
			</span>
			<br />
			<span>
				<b>Amount: </b>
				{`${(order.paymentData.paymentIntent.amount /= 100).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})} `}
			</span>
			<span className='badge bg-warning text-light'>
				<b>{order.paymentData.paymentIntent.currency.toUpperCase()}</b>
			</span>
			<br />
			<span>
				<b>Payment Method: </b>
				{`${order.paymentData.paymentIntent.payment_method_types[0].toUpperCase()} `}
			</span>
			<span className='badge bg-info text-light'>
				<b>{order.paymentData.paymentIntent.status.toUpperCase()}</b>
			</span>
			<br />
			<span>
				<b>Order Date: </b>
				{`${new Date(order.paymentData.paymentIntent.created * 1000).toLocaleString()} `}
			</span>
			{showStatus && <span className={`badge ${orderStatusClazzName}`}>{order.orderStatus}</span>}
		</div>
	);
};

export default PaymentInfo;
