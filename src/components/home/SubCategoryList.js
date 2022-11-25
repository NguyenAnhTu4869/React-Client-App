import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSubCategories } from '../../services/sub-category-service';
import TextBanner from '../banner/TextBanner';
import { LoadingOutlined } from '@ant-design/icons';

const SubCategoryList = () => {
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllSubCategories().then((res) => {
			setSubCategories(res.data);
			setLoading(false);
		});
	}, []);

	const RenderSubCategories = () =>
		subCategories.map((sub) => (
			<div
				key={sub._id}
				className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
				<Link to={`/sub-category/${sub.slug}`}>{sub.name}</Link>
			</div>
		));

	return (
		<div>
			<TextBanner text='Sub Categories' />
			<div className='container'>
				{loading && (
					<h4 className='text-center text-info'>
						Loading Sub Categories&nbsp;
						<LoadingOutlined />
					</h4>
				)}
				<div className='row text-center'>{!loading && <RenderSubCategories />}</div>
			</div>
		</div>
	);
};

export default SubCategoryList;
