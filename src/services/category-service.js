import { getCategoryBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const getAllCategories = async () => axios.get(getCategoryBaseUrl('/list-all'));

export const getCategory = async (slug) => axios.get(getCategoryBaseUrl(`/${slug}`));

export const deleteCategory = async (slug, accessToken) =>
	axios.delete(getCategoryBaseUrl(`/${slug}`), {
		headers: {
			accessToken,
		},
	});

export const updateCategory = async (slug, categoryName, accessToken) =>
	axios.put(
		getCategoryBaseUrl(`/${slug}`),
		{ name: categoryName },
		{
			headers: {
				accessToken,
			},
		}
	);

export const createCategory = async (categoryName, accessToken) =>
	axios.post(
		getCategoryBaseUrl(''),
		{ name: categoryName },
		{
			headers: {
				accessToken,
			},
		}
	);

export const getSubsByParent = async (id, setData) => {
	axios.get(getCategoryBaseUrl(`/list-sub/${id}`)).then((res) => setData(res.data));
};

export const getProductByCategory = async (id) =>
	axios.get(getCategoryBaseUrl(`/list-product/${id}`));
