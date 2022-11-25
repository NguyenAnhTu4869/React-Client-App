import { getUserBaseUrl, getOrderBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const userCheckout = (cart, accessToken) =>
	axios.post(getUserBaseUrl('/checkout'), { cart }, { headers: { accessToken } });

export const getUserCart = (accessToken) =>
	axios.get(getUserBaseUrl('/cart'), { headers: { accessToken } });

export const emptyUserCart = (accessToken) =>
	axios.delete(getUserBaseUrl('/cart'), { headers: { accessToken } });

export const updateUserAddress = (address, accessToken) =>
	axios.post(getUserBaseUrl('/cart/address'), { address }, { headers: { accessToken } });

export const applyCoupon = async (coupon, accessToken) =>
	await axios.post(getUserBaseUrl('/coupon'), { coupon }, { headers: { accessToken } });

export const createOnlinePaymentOrder = async (paymentData, accessToken) =>
	axios.post(getOrderBaseUrl('/online'), { paymentData }, { headers: { accessToken } });

export const createOrderWithCOD = async (accessToken, isCashOnDelivery, coupon) =>
	axios.post(
		getOrderBaseUrl('/cod'),
		{ cod: isCashOnDelivery, coupon },
		{ headers: { accessToken } }
	);

export const getUserOrders = (accessToken) =>
	axios.get(getOrderBaseUrl('/list-all'), { headers: { accessToken } });

export const getUserWishlist = (accessToken) =>
	axios.get(getUserBaseUrl('/wishlist'), { headers: { accessToken } });

export const addProductToWishList = (accessToken, productId) =>
	axios.post(getUserBaseUrl('/wishlist'), { productId }, { headers: { accessToken } });

export const removeProductToWishList = (accessToken, productId) =>
	axios.put(getUserBaseUrl(`/wishlist/${productId}`), {}, { headers: { accessToken } });
