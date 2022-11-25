import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getUserCart,
	emptyUserCart,
	updateUserAddress,
	applyCoupon,
	createOrderWithCOD,
} from '../../services/user-service';
import { ADD_TO_CART, COUPON_APPLIED, PAY_COD } from '../../reducers/actions/types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { errorNotify, infoNotify, successNotify } from '../../components/modal/ToastNotification';

const initialState = {
	products: [],
	total: 0,
	totalAfterDiscount: 0,
	discount: 0,
	discountErr: '',
};

const CheckOut = ({ history }) => {
	const [cartInfo, setCartInfo] = useState(initialState);
	const [userAddress, setUserAddress] = useState({ textContent: '', htmlText: '' });
	const [prevSavedAddress, setPrevSavedAddress] = useState('');
	const [isUserAddSave, setIsUserAddSave] = useState(false);
	const [couponName, setCouponName] = useState('');

	const { user, payCOD, coupon } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		getUserCart(user.token).then((res) => {
			setCartInfo({ products: res.data.products, total: res.data.cartTotal });
		});
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			let localStorageJson = localStorage.getItem('userInfo');
			if (localStorageJson['address']) {
				setPrevSavedAddress(JSON.parse(localStorageJson).address.address);
				setIsUserAddSave(true);
			}
		}
	}, [prevSavedAddress]);

	const handleClickSave = () => {
		updateUserAddress(userAddress, user.token).then((res) => {
			if (res.data.success) {
				successNotify('Your address is saved!');
				setIsUserAddSave(true);
			}
		});
	};

	const handleClickEmptyCart = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('cart');
		}
		dispatch({
			type: ADD_TO_CART,
			payload: [],
		});
		emptyUserCart(user.token).then((res) => {
			setCartInfo(initialState);
			infoNotify('Your cart is cleared 👍 Please continue your shopping!');
		});
	};

	const handleClickApply = () => {
		applyCoupon(couponName, user.token).then((res) => {
			const { data } = res;
			if (data.error) {
				setCartInfo({ ...cartInfo, discountErr: data.error });
				errorNotify(data.error);
				dispatch({ type: COUPON_APPLIED, payload: false });
			}
			if (data.success) {
				setCartInfo({
					...cartInfo,
					totalAfterDiscount: data.discountPrice,
					discount: data.discount,
				});
				dispatch({ type: COUPON_APPLIED, payload: true });
			}
		});
	};

	const handClickPlaceOrder = () => {
		if (payCOD) {
			createOrderWithCOD(user.token, payCOD, coupon).then((res) => {
				if (res.data.orderCreated) {
					//Clear local storage/redux state (cart, coupon, payCod). Send request to clear cart in DB
					if (typeof window !== 'undefined') localStorage.removeItem('cart');
					dispatch({
						type: ADD_TO_CART,
						payload: [],
					});
					dispatch({
						type: COUPON_APPLIED,
						payload: false,
					});
					dispatch({
						type: PAY_COD,
						payload: false,
					});
					emptyUserCart(user.token).then((res) => {
						setCartInfo(initialState);
					});
					setTimeout(() => {
						history.push('/user/history');
					}, 1000);
				}
			});
		} else {
			history.push('/user/payment');
		}
	};

	const showOrderedProducts = () => {
		const { products } = cartInfo;
		if (products) {
			return products.map((product, index) => (
				<Fragment key={`${index}-${product._id}`}>
					<div
						key={`${index}-${product._id}`}
						className='col'>
						<p className='row'>
							<span
								className='text-primary'
								style={{ fontWeight: 'bold' }}>
								{`${product.product.title}:`}&nbsp;
							</span>
							{product.count} item(s)
						</p>
						<p className='row'>
							Color:&nbsp;
							<span style={{ color: `${product.color === 'White' ? 'Grey' : product.color}` }}>
								{product.color}&nbsp;
							</span>
							|&nbsp;Total: ${product.product.price * product.count}
						</p>
					</div>
				</Fragment>
			));
		}
	};

	const onChange = (content, delta, source, editor) => {
		const text = editor.getText(content).trim();
		setUserAddress({ address: text, htmlText: content });
	};

	const ShowTextArea = useMemo(() => {
		return (
			<Fragment>
				<ReactQuill
					defaultValue={userAddress}
					placeholder={'Type your address, phone, zipcode...'}
					theme='snow'
					onChange={onChange}
					style={{ height: '80px' }}
				/>
				<br />
				<br />
				<button
					className='btn btn-outline-primary mt-2 float-right'
					onClick={handleClickSave}>
					Save
				</button>
				<br />
			</Fragment>
		);
	}, [userAddress]);

	const ShowApplyCoupon = useMemo(() => {
		return (
			<Fragment>
				<input
					type='text'
					value={couponName}
					className='form-control'
					onChange={(e) => {
						setCouponName(e.target.value);
					}}
				/>
				<button
					className='btn btn-outline-primary mt-2 float-right'
					onClick={handleClickApply}>
					Apply
				</button>
			</Fragment>
		);
	}, [couponName]);

	return (
		<div className='row pt-2 pl-4 pr-4'>
			<div className='col-md-6'>
				<h4>Delivery Details</h4>
				{ShowTextArea}
				<h5 className='pt-4'>Apply Coupon</h5>
				{ShowApplyCoupon}
			</div>
			<div className='col-md-6'>
				<h4>Order Summary</h4>
				<p>Total Products: {cartInfo.products.length}</p>
				<hr />
				{showOrderedProducts()}
				<hr />
				<p>
					Cart Total: ${cartInfo.total}
					<br />
					{prevSavedAddress && <b>Previous Delivery Details: {prevSavedAddress}</b>}
				</p>
				{cartInfo.totalAfterDiscount > 0 && (
					<p className='text-light text-center bg-success pt-2 pb-2'>
						Discount Total: ${cartInfo.totalAfterDiscount} <br />
						Coupon {cartInfo.discount}% discount is applied
					</p>
				)}
				<div className='col'>
					<div className='row'>
						<button
							disabled={!isUserAddSave || !cartInfo.products.length || !prevSavedAddress}
							className='btn btn-success btn-raised'
							onClick={handClickPlaceOrder}>
							Place Order
						</button>
					</div>
					<div className='row pt-2'>
						<button
							disabled={!cartInfo.products.length}
							onClick={handleClickEmptyCart}
							className='btn btn-outline-danger'>
							Empty Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
