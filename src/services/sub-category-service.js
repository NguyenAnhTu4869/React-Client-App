import { getSubCategoryBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const getAllSubCategories = async () => axios.get(getSubCategoryBaseUrl('/list-all'));

export const getSubCategory = async (slug) => axios.get(getSubCategoryBaseUrl(`/${slug}`));

export const deleteSubCategory = async (slug, accessToken) =>
	axios.delete(getSubCategoryBaseUrl(`/${slug}`), {
		headers: {
			accessToken,
		},
	});

export const updateSubCategory = async (slug, subName, parent, accessToken) =>
	axios.put(
		getSubCategoryBaseUrl(`/${slug}`),
		{ name: subName, categoryId: parent },
		{
			headers: {
				accessToken,
			},
		}
	);

export const createSubCategory = async (subName, categoryId, accessToken) =>
	axios.post(
		getSubCategoryBaseUrl(''),
		{ name: subName, categoryId },
		{
			headers: {
				accessToken,
			},
		}
	);

export const getProductsBySub = async (id) =>
	axios.get(getSubCategoryBaseUrl(`/list-product/${id}`));
