import { getProductBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const createProduct = async (product, accessToken) =>
	axios.post(getProductBaseUrl(''), product, {
		headers: {
			accessToken,
		},
	});

export const getAllProducts = async () => {
	return axios.get(getProductBaseUrl('/list-all'));
};

export const getProductInfo = async (slug) => axios.get(getProductBaseUrl(`/${slug}`));

export const updateProduct = async (slug, product, accessToken) =>
	axios.put(getProductBaseUrl(`/${slug}`), product, {
		headers: {
			accessToken,
		},
	});

export const removeProduct = async (slug, accessToken) =>
	axios.delete(getProductBaseUrl(`/${slug}`), {
		headers: {
			accessToken,
		},
	});

export const getLatestSortedProducts = async (sort, order, page, limit) =>
	axios.post(getProductBaseUrl('/list/sort'), { sort, order, page, limit });

export const getTotalProductsCount = async () => axios.get(getProductBaseUrl('/count'));

export const updateProductRating = async (productId, rating, accessToken) =>
	axios.put(
		getProductBaseUrl(`/rating/${productId}`),
		{ star: rating },
		{
			headers: {
				accessToken,
			},
		}
	);

export const getAllRelated = async (productId, limit) =>
	axios.get(getProductBaseUrl(`/related/${productId}/${limit}`));

export const searchProductByFilter = async (filters) =>
	axios.post(getProductBaseUrl('/search'), filters);
