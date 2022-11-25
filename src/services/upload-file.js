import { getUploadBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const uploadFileToCloudinary = (uri, accessToken) =>
	axios.post(getUploadBaseUrl('/upload'), { image: uri }, { headers: { accessToken } });

export const removeImage = (public_id, accessToken) =>
	axios.post(getUploadBaseUrl('/remove'), { public_id }, { headers: { accessToken } });
