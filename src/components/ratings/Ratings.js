import React, { Fragment, useMemo, memo } from 'react';
import StarRatings from 'react-star-ratings';

const Ratings = ({ product, dimension }) => {
	const { ratings } = product;
	const starDimension = dimension !== undefined ? dimension : '20px';

	const RenderRating = (rating, title) => {
		return (
			<div className='text-center pt-2 pb-3'>
				<span>
					<StarRatings
						starDimension={starDimension}
						starSpacing='3px'
						rating={rating}
						starRatedColor='#ff4757'
						starEmptyColor='#dfe4ea'
						editing={false}
					/>
					<br />
					{title}
				</span>
			</div>
		);
	};

	const calcAverageRatings = useMemo(() => {
		if (product && ratings && ratings.length) {
			let total = [];
			let length = ratings.length;
			ratings.map((r) => total.push(r.star));

			let totalStar = total.reduce((prev, next) => prev + next, 0);
			let highestValue = length * 5;
			let result = (totalStar * 5) / highestValue;

			return <Fragment>{RenderRating(result, `${length} Rating(s)`)}</Fragment>;
		} else {
			return <Fragment>{RenderRating(0, 'No Rating yet')}</Fragment>;
		}
	}, [product]);

	return <Fragment>{calcAverageRatings}</Fragment>;
};

export default memo(Ratings);
