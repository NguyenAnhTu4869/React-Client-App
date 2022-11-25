import React from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderInvoice from '../order/OrderInvoice';

const PaymentItemTable = ({ order, children, showDownloadLink = true }) => {
	const showPDFDownloadLink = () => {
		return (
			<PDFDownloadLink
				document={<OrderInvoice order={order} />}
				fileName='invoice.pdf'
				className='btn btn-sm btn-block btn-raised btn-info'>
				GET INVOICE PDF
			</PDFDownloadLink>
		);
	};

	return (
		<div
			key={order._id}
			className='m-5 p-3 card'>
			{children}
			<table className='table table-bordered text-center'>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>Title</th>
						<th scope='col'>Price</th>
						<th scope='col'>Brand</th>
						<th scope='col'>Color</th>
						<th scope='col'>Quantity</th>
						<th scope='col'>Shipping</th>
					</tr>
				</thead>
				<tbody>
					{order.products.map((item) => (
						<tr key={item._id}>
							<td>
								<b>{item.product.title}</b>
							</td>
							<td>${item.product.price}</td>
							<td>{item.product.brand}</td>
							<td style={{ color: `${item.color === 'White' ? 'Grey' : item.color}` }}>
								{item.color}
							</td>
							<td>{item.count}</td>
							<td>
								{item.product.shipping === 'Yes' ? (
									<CheckCircleFilled className='text-success' />
								) : (
									<CloseCircleFilled className='text-danger' />
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showDownloadLink && <div className='row pl-4 pr-4'>{showPDFDownloadLink()}</div>}
		</div>
	);
};

export default PaymentItemTable;
