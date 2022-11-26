import { getCommentBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const saveProductComment = async (comment, accessToken) =>
	axios.post(getCommentBaseUrl('/save-comment'), { comment }, { headers: { accessToken } });

export const getAllProductComments = async (productId) =>
	axios.get(getCommentBaseUrl(`/${productId}/list-all`));

export const updateProductCommnet = async (commentId, accessToken, content) =>
	axios.put(
		getCommentBaseUrl(`/${commentId}/update-comment`),
		{ content },
		{ headers: { accessToken } }
	);

export const removeProductComment = async (commentId, accessToken) =>
	axios.delete(getCommentBaseUrl(`/${commentId}/remove-comment`), { headers: { accessToken } });
