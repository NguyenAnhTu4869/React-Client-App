import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { successNotify, infoNotify, errorNotify } from '../components/modal/ToastNotification';
import { getProductInfo, updateProductRating, getAllRelated } from '../services/product-service';
import { getAllProductComments } from '../services/comment-service';
import ProductDetails from '../components/cards/ProductDetails';
import ProductCard from '../components/cards/ProductCard';

const SingleProduct = ({ match }) => {
	const [product, setProduct] = useState({});
	const [userRating, setUserRating] = useState(0);
	const [comments, setComments] = useState([]);
	const [loadComments, setLoadComments] = useState(true);
	const [relatedProduct, setRelatedProducts] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	const { slug } = match.params;

	useEffect(() => {
		if (loadComments) loadProductDetails();
		setLoadComments(false);
	}, [loadComments]);

	useEffect(() => {
		if (product.ratings && product.ratings.star && user) {
			let currentUserRating = product.ratings.find(
				(elem) => elem.postedBy.toString() === user._id.toString()
			);
			setUserRating(currentUserRating.star);
		}
	}, [product, user]);

	const loadProductDetails = () => {
		getProductInfo(slug).then((res) => {
			setProduct(res.data);
			getAllProductComments(res.data._id).then((res) => {
				if (res.data.success) {
					setComments(res.data.comments);
				} else {
					errorNotify(res.data.error);
				}
			});
			getAllRelated(res.data._id, 3).then((res) => {
				setRelatedProducts(res.data);
			});
		});
	};

	const handleUserRating = (newRating, name) => {
		setUserRating(newRating);
		updateProductRating(name, newRating, user.token)
			.then((res) => {
				successNotify('Thank you for your rating 🙏 Please continue visit our shop!!!');
				loadProductDetails(); //To show updated rating in real time
			})
			.catch((error) => {
				let { status } = error.response;
				if (status === 401) {
					infoNotify('Your session is expired 😥 Please re-login to rating this product!');
				}
			});
	};

	const updateCommentComp = () => {
		setLoadComments(true);
	};

	const ShowRelatedProduct = () => (
		<Fragment>
			{relatedProduct.length ? (
				relatedProduct.map((product) => (
					<div
						key={product._id}
						className='col-md-4'>
						<ProductCard product={product} />
					</div>
				))
			) : (
				<div className='text-center col'>Not related product found !!!</div>
			)}
		</Fragment>
	);

	return (
		<div className='container-fluid'>
			<div className='row pt-4'>
				<ProductDetails
					product={product}
					userInfo={user}
					handleUserRating={handleUserRating}
					star={userRating}
					comments={comments}
					refreshComment={updateCommentComp}
				/>
			</div>
			<div className='row p-5'>
				<div className='col text-center pt-md-5 pb-md-5 pt-3 pb-3'>
					<hr />
					<h3>Related Products</h3>
					<hr />
				</div>
			</div>
			<div className='row pb-5'>
				<ShowRelatedProduct />
			</div>
		</div>
	);
};

export default SingleProduct;
