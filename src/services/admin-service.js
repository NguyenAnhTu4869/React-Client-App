import axios from 'axios';
import { getAdminBaseUrl } from './helper/getBaseUrl';

export const getAllOrders = async (accessToken) =>
	await axios.get(getAdminBaseUrl(`/order/list-all`), { headers: { accessToken } });

export const updateOrderStatus = async (orderId, orderStatus, accessToken) =>
	await axios.put(
		getAdminBaseUrl(`/order/status`),
		{ orderId, orderStatus },
		{ headers: { accessToken } }
	);
