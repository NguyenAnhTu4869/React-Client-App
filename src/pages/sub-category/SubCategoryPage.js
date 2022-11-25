import React, { useState, useEffect, Fragment } from 'react';
import { getSubCategory, getProductsBySub } from '../../services/sub-category-service';
import ProductCard from '../../components/cards/ProductCard';
import TextBanner from '../../components/banner/TextBanner';

const SubCategoryPage = ({ match }) => {
	const [subCategory, setSubCategory] = useState({});
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getAllProductsBySubCategory();
	}, []);

	const getAllProductsBySubCategory = () => {
		getSubCategory(slug).then((res) => {
			setSubCategory(res.data);
			console.log(JSON.stringify(res.data, null, 2));

			getProductsBySub(res.data._id).then((res) => {
				setProductsList(res.data);
				console.log(JSON.stringify(res.data, null, 2));
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
		: `${productsList.length} product(s) found in "${subCategory.name}"`;

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

export default SubCategoryPage;
