import React, { Fragment } from 'react';
import PaymentInfo from '../payment/PaymentInfo';
import { ORDER_STATUS } from '../../static/Data';
import PaymentItemTable from '../payment/PaymentItemTable';

const OrderList = ({ orders, onStatusChange }) => {
	const getTextClassName = (order) => {
		let clazzName = '';
		switch (order.orderStatus) {
			case 'NOT PROCESSED':
				clazzName = 'bg-secondary';
				break;
			case 'PROCESSING':
				clazzName = 'bg-info';
				break;
			case 'DISPATCHED':
				clazzName = 'bg-primary';
				break;
			case 'CANCELED':
				clazzName = 'bg-danger';
				break;
			case 'COMPLETED':
				clazzName = 'bg-success';
				break;
			case 'CASH ON DELIVERY':
				clazzName = 'bg-secondary';
				break;
		}
		return clazzName;
	};

	const handleChange = (e, orderId) => {
		onStatusChange(orderId, e.target.value);
	};

	return (
		<Fragment>
			<table className='table table-responsive'>
				<thead className='thead-light text-center'>
					<tr>
						<th scope='col'>ORDER DETAILS</th>
						<th scope='col'>CURRENT STATUS</th>
						<th scope='col'>UPDATE STATUS</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr
							key={order._id}
							className='bg-light'>
							<td>
								<PaymentInfo
									order={order}
									showStatus={false}
								/>
								<PaymentItemTable
									order={order}
									showDownloadLink={false}
								/>
							</td>
							<td
								className='text-center'
								style={{ fontSize: '1rem' }}>
								<span className={`badge ${getTextClassName(order)} text-light`}>
									{order.orderStatus}
								</span>
							</td>
							<td className='text-center'>
								<select
									style={{ fontSize: '.8rem' }}
									className='form-control text-center'
									defaultValue={order.orderStatus}
									onChange={(e) => {
										handleChange(e, order._id);
									}}>
									{ORDER_STATUS.map((status, index) => (
										<option
											key={index}
											value={status}>
											{status}
										</option>
									))}
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default OrderList;
