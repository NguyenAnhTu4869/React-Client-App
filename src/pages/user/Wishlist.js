import React, { useEffect, useState } from 'react';
import UserNav from '../../components/navigation/UserNav';
import { getUserWishlist, removeProductToWishList } from '../../services/user-service';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { infoNotify } from '../../components/modal/ToastNotification';

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));
	const history = useHistory();

	useEffect(() => {
		fetchUserWishlist();
	}, []);

	const fetchUserWishlist = () => {
		getUserWishlist(user.token).then((res) => {
			setWishlist(res.data.wishlist);
		});
	};

	const handleRemoveProduct = (productId, title) => {
		removeProductToWishList(user.token, productId).then((res) => {
			if (res.data.success) {
				infoNotify(`${title} is removed from your wishlist 👍`);
				fetchUserWishlist();
			}
		});
	};

	const WishListItem = () => (
		<div
			className='table-bordered container-fluid p-1'
			style={{ width: '40rem' }}>
			{wishlist.map((product) => (
				<div
					key={product._id}
					className='alert alert-secondary'>
					<img
						src={product.images[0].url}
						alt={product.title}
						style={{
							width: '6.5rem',
							height: 'auto',
							paddingRight: '.5rem',
						}}
					/>
					<a
						className='text-info'
						onClick={() => history.push(`/product/${product.slug}`)}>
						{product.title}
					</a>
					<span>{` (Price: $${product.price})`}</span>
					<span
						className='float-right text-danger'
						style={{ cursor: 'pointer' }}
						onClick={() => handleRemoveProduct(product._id, product.title)}>
						<DeleteOutlined />
						&nbsp; Remove
					</span>
				</div>
			))}
		</div>
	);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col'>
					<h4 className='text-center'>
						{wishlist.length ? 'Your Wishlist' : 'No Product Added To Wishlist'}
					</h4>
					<WishListItem />
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
