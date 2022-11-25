import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { CheckCircleFilled, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { warningNotify } from '../modal/ToastNotification';
import Laptop from '../../images/laptop.png';
import { COLOR as OPTIONS } from '../../static/Data';
import { ADD_TO_CART } from '../../reducers/actions/types';

const ProductCheckoutItem = ({ product }) => {
	const [visible, setVisible] = useState(false);

	const { title, price, color, count, shipping, images, quantity } = product;
	const dispatch = useDispatch();

	const handleColorChange = (e) => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((item, index) => {
				if (item._id === product._id) {
					cart[index].color = e.target.value;
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: ADD_TO_CART,
				payload: cart,
			});
		}
	};

	const handleQuantityChange = (e) => {
		let cart = [];
		let currentQuantity = e.target.value < 1 ? 1 : e.target.value;

		if (currentQuantity > quantity) {
			warningNotify(`Only ${quantity} ${title.toUpperCase()} product(s) left`);
			return;
		}

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((item, index) => {
				if (item._id === product._id) {
					cart[index].count = currentQuantity;
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: ADD_TO_CART,
				payload: cart,
			});
		}
	};

	const handleRemoveItem = (e) => {
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((item, index) => {
				if (item._id === product._id) {
					cart.splice(index, 1);
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: ADD_TO_CART,
				payload: cart,
			});
		}
	};

	const showImage = (url, alt) => (
		<Fragment>
			<Image
				preview={{ visible: false }}
				width={240}
				src={url}
				onClick={() => setVisible(true)}
			/>
			<div style={{ display: 'none' }}>
				<Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
					{images.length ? (
						images.map((img, index) => (
							<Image
								key={index}
								src={img.url}
							/>
						))
					) : (
						<Image src={Laptop} />
					)}
				</Image.PreviewGroup>
			</div>
		</Fragment>
	);

	let url = images.length ? images[0].url : Laptop;

	const renderSelectOptions = (options, data, handleDataChange) => {
		return (
			<select
				className='form-control text-center'
				name='data'
				id={`data-${data}`}
				onChange={handleDataChange}>
				{data ? (
					<option
						value={data}
						key={data}>
						{data}
					</option>
				) : (
					<option>Select</option>
				)}
				{options
					.filter((option) => option !== data)
					.map((data) => (
						<option
							key={data}
							value={data}>
							{data}
						</option>
					))}
			</select>
		);
	};

	return (
		<tbody>
			<tr className='text-center cart-items border'>
				<td>{showImage(url, title)}</td>
				<td>{title}</td>
				<td>${price}</td>
				<td>{renderSelectOptions(OPTIONS, color, handleColorChange)}</td>
				<td className='shipping-status'>
					{shipping === 'Yes' ? (
						<CheckCircleFilled className='text-success' />
					) : (
						<CloseCircleFilled className='text-danger' />
					)}
				</td>
				<td className='product-quantity'>
					<input
						className='quantity'
						name='quantity'
						value={count}
						type='number'
						onChange={handleQuantityChange}
					/>
				</td>
				<td className='text-warningNotify'>
					<DeleteOutlined
						className='pointer'
						onClick={handleRemoveItem}
					/>
				</td>
			</tr>
		</tbody>
	);
};

export default ProductCheckoutItem;
