import React, { Fragment, useState, useEffect } from 'react';
import { getLatestSortedProducts } from '../../services/product-service';
import ProductCard from '../cards/ProductCard';
import CardLoading from '../cards/CardLoading';
import { Pagination } from 'antd';
import Ratings from '../../components/ratings/Ratings';
import TextBanner from '../banner/TextBanner';

const pageSizeOptions = ['6', '12', '24'];

const BestSellersComp = ({ totaProducts }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(6);

	useEffect(() => {
		fetchAllProducts();
	}, [page, itemsPerPage]);

	const fetchAllProducts = () => {
		setLoading(true);
		getLatestSortedProducts('sold', 'desc', page, itemsPerPage).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	const RenderProductCards = () =>
		products.map((product) => (
			<div
				key={product._id}
				className='col-md-4'>
				<Ratings product={product} />
				<ProductCard product={product} />
			</div>
		));

	return (
		<Fragment>
			<TextBanner text='Best Sellers' />
			<div className='container'>
				{loading || products.length < 1 ? (
					<CardLoading count={products.length} />
				) : (
					<div className='row'>
						<RenderProductCards />
					</div>
				)}
			</div>
			<div className='container'>
				<div className='row'>
					<nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
						<Pagination
							current={page}
							defaultPageSize={6}
							total={totaProducts}
							onChange={(value) => setPage(value)}
							pageSizeOptions={pageSizeOptions}
							showSizeChanger
							onShowSizeChange={(current, size) => {
								setItemsPerPage(size);
							}}
						/>
					</nav>
				</div>
			</div>
		</Fragment>
	);
};

export default BestSellersComp;
