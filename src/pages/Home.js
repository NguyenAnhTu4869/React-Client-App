import React, { Fragment, useState, useEffect } from 'react';
import { getTotalProductsCount } from '../services/product-service';
import TypeWriterComp from '../components/type-writer/TypeWriterComp';
import NewArrivalsComp from '../components/home/NewArrivalsComp';
import BestSellersComp from '../components/home/BestSellersComp';
import CategoryList from '../components/home/CategoryList';
import SubCategoryList from '../components/home/SubCategoryList';

const HeadingText = ['New Arrivals !!!', 'Latest Products', 'Best Products'];

const Home = () => {
	const [totalProducts, setTotalProducts] = useState(0);

	useEffect(() => {
		getTotalProductsCount().then((res) => {
			setTotalProducts(res.data);
		});
	}, []);

	return (
		<Fragment>
			<div
				className='jumbotron d-none d-sm-block text-center font-weight-bold display-1 mt-2'
				id='head-writer'
				style={{
					color: '#f5f6fa',
					textShadow: '8px 8px #353b48',
					background: 'linear-gradient(165deg, #787FF6 22%, #4ADEDE 70%)',
				}}>
				<TypeWriterComp text={HeadingText} />
			</div>
			<div
				className='jumbotron d-block d-sm-none text-center font-weight-bold display-3 mt-2'
				id='head-writer'
				style={{
					color: '#f5f6fa',
					textShadow: '8px 8px #353b48',
					background: 'linear-gradient(165deg, #787FF6 22%, #4ADEDE 70%)',
				}}>
				<TypeWriterComp text={HeadingText} />
			</div>
			<NewArrivalsComp totaProducts={totalProducts} />
			<BestSellersComp totaProducts={totalProducts} />
			<CategoryList />
			<SubCategoryList />
			<br />
			<br />
		</Fragment>
	);
};

export default Home;
