import { getPaymentBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const createPaymentIntent = (accessToken, coupon) =>
	axios.post(getPaymentBaseUrl(), { isApplyCounpon: coupon }, { headers: { accessToken } });
