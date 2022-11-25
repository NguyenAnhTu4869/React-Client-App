import { combineReducers } from 'redux';
import { userReducer } from './splices/userReducer';
import { searchReducer } from './splices/searchReducer';
import { cartReducer } from './splices/cartReducer';
import { drawerReducer } from './splices/drawerReducer';
import { couponReducer } from './splices/couponReducer';
import { payCodReducer } from './splices/payCodReducer';
import { modalReducer } from './splices/modalReducer';

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	drawer: drawerReducer,
	coupon: couponReducer,
	payCOD: payCodReducer,
	modal: modalReducer,
});

export default rootReducer;
