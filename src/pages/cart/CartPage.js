import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCheckoutItem from '../../components/cards/ProductCheckoutItem';
import { userCheckout } from '../../services/user-service';
import { PAY_COD } from '../../reducers/actions/types';
import { errorNotify } from '../../components/modal/ToastNotification';

const CartPage = ({ history }) => {
	const { cart, user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const getTotalPrice = () => {
		return cart.reduce((currentVal, nextVal) => {
			return currentVal + nextVal.count * nextVal.price;
		}, 0);
	};

	const handleClickOnlinePayment = () => {
		userCheckout(cart, user.token)
			.then((res) => {
				if (res.data.success) {
					history.push('/user/checkout');
				}
			})
			.catch((error) => {
				const response = error.response;
				if (response.status === 401) {
					errorNotify('Your session is expired 😥 Please re-login to proceed to checkout!');
				}
			});
	};

	const handleClickCOD = () => {
		userCheckout(cart, user.token)
			.then((res) => {
				if (res.data.success) {
					dispatch({
						type: PAY_COD,
						payload: true,
					});
					history.push('/user/checkout');
				}
			})
			.catch((error) => {
				const response = error.response;
				if (response.status === 401) {
					errorNotify('Your session is expired 😥 Please re-login to proceed to checkout!');
				}
			});
	};

	const renderProductTable = () => (
		<div className='table-responsive'>
			<table className='table table-sm table-bordered'>
				<thead className='thead-light'>
					<tr className='text-center border'>
						<th scope='col'>Image</th>
						<th scope='col'>Title</th>
						<th scope='col'>Price</th>
						<th scope='col'>Color</th>
						<th scope='col'>Shipping</th>
						<th scope='col'>Quantity</th>
						<th scope='col'></th>
					</tr>
				</thead>
				{cart.map((product) => (
					<ProductCheckoutItem
						product={product}
						key={product._id}
					/>
				))}
			</table>
		</div>
	);

	const renderCartInfo = () => {
		if (cart.length < 1) {
			return (
				<p>
					No product added. <Link to='/shop'>Continue shopping</Link>
				</p>
			);
		} else {
			return <Fragment>{renderProductTable()}</Fragment>;
		}
	};

	const renderOrderDetails = () => {
		if (cart.length && cart.length > 0) {
			return (
				<Fragment>
					{cart.map((product, index) => (
						<div key={index}>
							<p>
								{product.count} x {product.title} (${product.price * product.count})
							</p>
						</div>
					))}
					<hr />
					<b
						className='text-primary'
						style={{ fontSize: '20px' }}>
						Total: <span className='text-dark'>${getTotalPrice()}</span>
					</b>
					<hr />
					{user ? (
						<Fragment>
							<button
								onClick={handleClickOnlinePayment}
								className='btn btn-sm btn-outline-success'
								disabled={!cart.length}>
								Checkout with Online Payment
							</button>
							<br />
							<button
								onClick={handleClickCOD}
								className='btn btn-sm btn-outline-info'
								disabled={!cart.length}>
								Checkout with Cash on delivery
							</button>
						</Fragment>
					) : (
						<button className='btn btn-sm btn-outline-info'>
							<Link to={{ pathname: '/login', state: { from: 'cart' } }}>Login to checkout</Link>
						</button>
					)}
				</Fragment>
			);
		}
	};

	return (
		<div className='container-fluid pt-2'>
			<div className='row'>
				<div className='text-center col-lg-8'>
					<div className='container'>
						<h4>{cart.length} item(s) in your cart</h4>
						{renderCartInfo()}
					</div>
				</div>
				<div className='col-lg-4'>
					<h4>Order Summary</h4>
					<hr />
					<h6>Selected Products</h6>
					{renderOrderDetails()}
				</div>
			</div>
		</div>
	);
};

export default CartPage;
