import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { successNotify } from '../../components/modal/ToastNotification';
import { getAllOrders, updateOrderStatus } from '../../services/admin-service';
import AdminNav from '../../components/navigation/AdminNav';
import OrderList from '../../components/order/OrderList';

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchAllOrders();
	}, []);

	const fetchAllOrders = () => {
		getAllOrders(user.token).then((res) => {
			setOrders(res.data);
		});
	};

	const handleUpdateOrderStatus = (orderId, orderStatus) => {
		updateOrderStatus(orderId, orderStatus, user.token).then((res) => {
			console.log(res.data);
			successNotify(`Order [${orderId}] by [${res.data.customer}] status updated!`);
			fetchAllOrders();
		});
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10 pt-2 justify-content-center'>
					<OrderList
						orders={orders}
						onStatusChange={handleUpdateOrderStatus}
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
