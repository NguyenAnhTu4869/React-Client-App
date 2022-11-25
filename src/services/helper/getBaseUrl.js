const API_BASE_URL = process.env.REACT_APP_API_LOCAL_BASE_URL;

const getBaseUrl = (path) => `${API_BASE_URL}${path}`;

export const getAdminBaseUrl = (path) => getBaseUrl(`/admin${path}`);
export const getIamBaseUrl = (path) => getBaseUrl(`/iam${path}`);
export const getCategoryBaseUrl = (path) => getBaseUrl(`/category${path}`);
export const getSubCategoryBaseUrl = (path) => getBaseUrl(`/sub-category${path}`);
export const getCouponBaseUrl = (path) => getBaseUrl(`/coupon${path}`);
export const getProductBaseUrl = (path) => getBaseUrl(`/product${path}`);
export const getPaymentBaseUrl = (path) => getBaseUrl(`/payment${path}`);
export const getUserBaseUrl = (path) => getBaseUrl(`/user${path}`);
export const getOrderBaseUrl = (path) => getBaseUrl(`/order${path}`);
export const getUploadBaseUrl = (path) => getBaseUrl(`/image${path}`);
