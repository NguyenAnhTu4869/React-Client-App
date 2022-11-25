import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { SET_DRAWER_VISIBILITY } from '../../reducers/actions/types';
import Laptop from '../../images/laptop.png';

const imageStyle = {
	width: '100%',
	height: '65%',
	objectFit: 'cover',
	paddingTop: '0.2rem',
	paddingBottom: '0.2rem',
};

const SideDrawer = () => {
	const { drawer, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch({
			type: SET_DRAWER_VISIBILITY,
			payload: false,
		});
	};

	const displayProduct = () => {
		if (cart.length && cart.length > 0) {
			return cart.map((product) => (
				<div
					className='row'
					key={product._id}>
					<div className='col'>
						{product.images[0] ? (
							<Fragment>
								<img
									src={product.images[0].url}
									alt={product.title}
									style={imageStyle}
								/>
								<p className='text-center '>
									{product.title} <br />
									<span className='text-info'>{product.count} item(s) added in cart</span>
								</p>
							</Fragment>
						) : (
							<Fragment>
								<img
									src={Laptop}
									alt='default'
									style={imageStyle}
								/>
								<p className='text-center'>
									{product.title} <br />
									<span className='text-info'>{product.count} item(s) added in cart</span>
								</p>
							</Fragment>
						)}
					</div>
				</div>
			));
		}
	};

	return (
		<Drawer
			className='text-center'
			title={`${cart.length} Product(s) in cart`}
			placement='right'
			closable={false}
			visible={drawer}
			onClose={handleClose}>
			{displayProduct()}
			<Link to={'/cart'}>
				<button
					onClick={handleClose}
					className='text-center btn btn-primary btn-raised btn-block'>
					Go To Cart
				</button>
			</Link>
		</Drawer>
	);
};

export default SideDrawer;
