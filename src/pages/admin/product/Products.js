import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, removeProduct } from '../../../services/product-service';
import { LoadingOutlined } from '@ant-design/icons';
import { errorNotify, successNotify } from '../../../components/modal/ToastNotification';
import { SET_MODAL_VISIBILITY } from '../../../reducers/actions/types';
import NotificationModal from '../../../components/modal/NotificationModal';
import AdminNav from '../../../components/navigation/AdminNav';
import AdminProductCard from '../../../components/cards/AdminProductCard';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productSlug, setProductSlug] = useState('');

	const dispatch = useDispatch();

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		setLoading(true);
		fetchProducts();
	}, []);

	const fetchProducts = () => {
		getAllProducts()
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const handleClickDeleteProduct = (slug) => {
		setProductSlug(slug);
		dispatch({ type: SET_MODAL_VISIBILITY, payload: true });
	};

	const handleClickYes = () => {
		removeProduct(productSlug, admin.token)
			.then((res) => {
				dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
				fetchProducts();
				successNotify(`"${res.data.title}" is deleted!`, {
					position: 'top-center',
				});
			})
			.catch((error) => errorNotify(error.response.data));
	};

	const ProductLists = () =>
		products.map((product) => (
			<div
				key={product._id}
				className='col-md-4 pb-2'>
				<AdminProductCard
					product={product}
					onClickDelete={handleClickDeleteProduct}
				/>
			</div>
		));

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{loading ? (
						<h4 className='text-warning'>
							Loading <LoadingOutlined />
						</h4>
					) : (
						<h4>All Products</h4>
					)}
					<div className='row'>
						<ProductLists />
					</div>
				</div>
			</div>
			<NotificationModal
				title={'Remove Product'}
				message={'Are you sure to delete this product?'}
				handleClickYes={handleClickYes}
			/>
		</div>
	);
};

export default Products;
