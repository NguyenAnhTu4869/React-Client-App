import { PRODUCT_FILTER } from '../actions/types';

export const searchReducer = (state = { text: '' }, action) => {
	switch (action.type) {
		case PRODUCT_FILTER:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
