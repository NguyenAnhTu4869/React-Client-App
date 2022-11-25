import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetailsList = ({ product }) => {
	const { price, category, subCategory, shipping, color, brand, quantity, sold } = product;

	return (
		<ul className='list-group'>
			<li
				className='list-group-item'
				key='price'>
				Price
				<span className='label label-default label-pill pull-xs-right'>${price}</span>
			</li>
			{category && (
				<li
					className='list-group-item'
					key='category'>
					Category
					<Link
						to={`/category/${category.slug}`}
						className='label label-default label-pill pull-xs-right'>
						{category.name}
					</Link>
				</li>
			)}
			{subCategory && (
				<li
					className='list-group-item'
					key='sub-category'>
					Sub Categories
					{subCategory.map((sub) => (
						<Link
							key={subCategory._id}
							to={`/sub-category/${sub.slug}`}
							className='label label-default label-pill pull-xs-right'>
							{sub.name}
						</Link>
					))}
				</li>
			)}
			<li
				className='list-group-item'
				key='shipping'>
				Shipping
				<span className='label label-default label-pill pull-xs-right'>{shipping}</span>
			</li>
			<li
				className='list-group-item'
				key='color'>
				Color
				<span className='label label-default label-pill pull-xs-right'>{color}</span>
			</li>
			<li
				className='list-group-item'
				key='brand'>
				Brand
				<span className='label label-default label-pill pull-xs-right'>{brand}</span>
			</li>
			<li
				className='list-group-item'
				key='in-stock'>
				In Stock
				<span className='label label-default label-pill pull-xs-right'>
					{sold ? quantity : quantity - sold}
				</span>
			</li>
			<li
				className='list-group-item'
				key='sold'>
				Sold
				<span className='label label-default label-pill pull-xs-right'>{sold}</span>
			</li>
		</ul>
	);
};

export default ProductDetailsList;
