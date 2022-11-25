import React, { Fragment } from 'react';
import StarRating from 'react-star-ratings';

const RatingOptions = ({ starClick, numberOfStars }) => (
	<Fragment>
		<div className='pb-1'>
			<StarRating
				changeRating={() => starClick(numberOfStars)}
				numberOfStars={numberOfStars}
				starDimension='22px'
				starSpacing='4px'
				starHoverColor='red'
				starEmptyColor='red'
			/>
			<br />
		</div>
	</Fragment>
);

export default RatingOptions;
