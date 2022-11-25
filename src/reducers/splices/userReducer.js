import { LOGIN_USER, LOGOUT_USER } from '../actions/types';

export const userReducer = (state = null, action) => {
	switch (action.type) {
		case LOGIN_USER:
			let { address, email, name, role } = action.payload;
			localStorage.setItem('userInfo', JSON.stringify({ address, email, name, role }));
			return action.payload;
		case LOGOUT_USER:
			return action.payload;
		default:
			return state;
	}
};
