import React from 'react';
import { Card, Skeleton } from 'antd';

const CardLoading = ({ count }) => {
	const renderSkeletonCars = () => {
		let cards = [];
		while (count > 0) {
			cards.push(
				<Card
					className='col-md-4'
					key={`item-${count}`}>
					<Skeleton active />
				</Card>
			);
			count--;
		}
		return cards;
	};

	return <div className='row pb-5'>{renderSkeletonCars()}</div>;
};

export default CardLoading;
