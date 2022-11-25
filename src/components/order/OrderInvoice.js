import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	DataTableCell,
} from '@david.kucsai/react-pdf-table';

const OrderInvoice = ({ order }) => {
	return (
		<Document>
			<Page style={styles.body}>
				<Text
					style={styles.header}
					fixed>
					~ {new Date().toLocaleString()} ~
				</Text>
				<Text style={styles.title}>Order Invoice</Text>
				<Text style={styles.author}>TechShop Ecommerce</Text>
				<Text style={styles.subtitle}>Order Summary</Text>

				<Table>
					<TableHeader>
						<TableCell>Title</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Brand</TableCell>
						<TableCell>Color</TableCell>
					</TableHeader>
				</Table>

				<Table data={order.products}>
					<TableBody>
						<DataTableCell getContent={(data) => data.product.title} />
						<DataTableCell getContent={(data) => `$${data.product.price}`} />
						<DataTableCell getContent={(data) => data.count} />
						<DataTableCell getContent={(data) => data.product.brand} />
						<DataTableCell getContent={(data) => data.product.color} />
					</TableBody>
				</Table>

				<Text style={styles.text}>
					<Text>
						Date {'                  :  '}
						{new Date(order.paymentData.paymentIntent.created * 1000).toLocaleString()}
					</Text>
					{'\n'}
					<Text>
						Order Id {'            :  '}
						{order.paymentData.paymentIntent.id}
					</Text>
					{'\n'}
					<Text>
						Transaction Id {'   :  '}
						{order.paymentData.paymentIntent.id}
					</Text>
					{'\n'}
					<Text>
						Order Status {'     :  '}
						{order.orderStatus}
					</Text>
					{'\n'}
					<Text>
						Total Paid {'          :  '}$ {order.paymentData.paymentIntent.amount}
					</Text>
				</Text>

				<Text style={styles.footer}> ~ THANK YOU FOR YOUR PURCHASE ~ </Text>
			</Page>
		</Document>
	);
};

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
	},
	author: {
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 40,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: 'justify',
		lineHeight: 2,
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 10,
		marginBottom: 15,
		textAlign: 'center',
		color: 'grey',
	},
	footer: {
		padding: '80px',
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey',
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'grey',
	},
});

export default OrderInvoice;
