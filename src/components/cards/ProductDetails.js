import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { addProductToWishList } from '../../services/user-service';
import { successNotify } from '../modal/ToastNotification';
import Laptop from '../../images/laptop.png';
import StarRatings from 'react-star-ratings';
import ProductDetailsList from './ProductDetailsList';
import RatingModal from '../modal/RatingModal';
import Ratings from '../../components/ratings/Ratings';
import { ADD_TO_CART, SET_DRAWER_VISIBILITY } from '../../reducers/actions/types';
import _ from 'lodash';

const { TabPane } = Tabs;

const ProductDetails = ({ product, userInfo, handleUserRating, star }) => {
	const [tooltip, setTooltip] = useState('Click to add');
	const { title, images, description, _id } = product;
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const history = useHistory();

	const ImagesCarousel = () => (
		<Carousel
			autoPlay
			infiniteLoop
			emulateTouch
			stopOnHover
			interval={4000}>
			{images && images.length ? (
				images &&
				images.map((image) => (
					<img
						src={image.url}
						key={image.public_id}
						style={{
							objectFit: 'fill',
						}}
					/>
				))
			) : (
				<img
					src={Laptop}
					className='mb-3 default-img'
				/>
			)}
		</Carousel>
	);

	const handleClickAddToCard = () => {
		let cartToUpdate = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) cartToUpdate = JSON.parse(localStorage.getItem('cart'));
			cartToUpdate.push({ ...product, count: 1 });
		}
		let unique = _.uniqWith(cartToUpdate, _.isEqual);
		localStorage.setItem('cart', JSON.stringify(unique));
		//Add new item to cart state in redux
		dispatch({
			type: ADD_TO_CART,
			payload: unique,
		});
		//Update drawer state in redux to open side drawer
		if (tooltip === 'Added') {
			return;
		} else {
			dispatch({
				type: SET_DRAWER_VISIBILITY,
				payload: true,
			});
			setTooltip('Added');
		}
	};

	const handleClickAddToWishList = (e) => {
		e.preventDefault();
		addProductToWishList(user.token, product._id).then((res) => {
			if (res.data.success) {
				successNotify(`${product.title} is added to your wish list 👏`);
				history.push('/user/wishlist');
			}
		});
	};

	const isProductNotAvailable = product.quantity < 1;

	return (
		<Fragment>
			<div className='col-lg-7 col-md-6'>
				<ImagesCarousel />
				<Tabs type='card'>
					<TabPane
						tab='Description'
						key='description'>
						{description}
					</TabPane>
					<TabPane
						tab='Specifications'
						key='specifications'>
						...
					</TabPane>
					<TabPane
						tab='More'
						key='more'>
						...
					</TabPane>
				</Tabs>
			</div>
			<div className='col-lg-5 col-md-6'>
				<h2
					className='p-3 text-center'
					style={{
						background: 'linear-gradient(185deg, #4b4b4b 40%, #84817a 85%)',
						color: '#7efff5',
					}}>
					{title}
				</h2>
				<Ratings
					product={product}
					dimension={`35px`}
				/>
				<Card
					actions={[
						<Tooltip
							title={tooltip}
							color='cyan'>
							<a
								onClick={handleClickAddToCard}
								disabled={isProductNotAvailable}>
								<ShoppingCartOutlined
									className={isProductNotAvailable ? 'text-secondary' : 'text-success'}
								/>
								<br /> {isProductNotAvailable ? 'Out of stock' : 'Add To Cart'}
							</a>
						</Tooltip>,
						<a onClick={handleClickAddToWishList}>
							<HeartOutlined className='text-info' />
							<br />
							Add To Wishlist
						</a>,
						<RatingModal
							userInfo={userInfo}
							star={star}>
							<StarRatings
								name={_id}
								numberOfStars={5}
								rating={star}
								changeRating={handleUserRating}
								isSelectable={true}
								starRatedColor='#ff4757'
								starEmptyColor='#dfe4ea'
								starHoverColor='#ff4757'
							/>
						</RatingModal>,
					]}>
					<ProductDetailsList product={product} />
				</Card>
			</div>
		</Fragment>
	);
};

export default ProductDetails;
