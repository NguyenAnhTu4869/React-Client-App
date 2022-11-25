import React, { useState, useEffect, Fragment } from 'react';
import { getCategory, getProductByCategory } from '../../services/category-service';
import ProductCard from '../../components/cards/ProductCard';
import TextBanner from '../../components/banner/TextBanner';

const CategoryPage = ({ match }) => {
	const [category, setCategory] = useState({});
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getAllProductsByCategory();
	}, []);

	const getAllProductsByCategory = () => {
		getCategory(slug).then((res) => {
			setCategory(res.data);
			getProductByCategory(res.data._id).then((res) => {
				setProductsList(res.data);
				setLoading(false);
			});
		});
	};

	const RenderProductsList = () => (
		<div className='row'>
			{productsList.map((product) => (
				<div
					className='col-md-4 pt-4 p-2'
					key={product._id}>
					<ProductCard product={product} />
				</div>
			))}
		</div>
	);

	const title = loading
		? 'Loading...'
		: `${productsList.length} product(s) found in "${category.name}"`;

	return (
		<Fragment>
			<TextBanner text={title} />
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<RenderProductsList />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default CategoryPage;
