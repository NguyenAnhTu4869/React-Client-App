import { PAY_COD } from '../actions/types';

export const payCodReducer = (state = false, action) => {
	switch (action.type) {
		case PAY_COD:
			return action.payload;
		default:
			return state;
	}
};
