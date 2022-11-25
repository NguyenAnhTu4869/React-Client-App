import React, { Fragment, useState, useMemo, memo } from 'react';
import { Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';

const RatingModal = ({ children, userInfo, star }) => {
	const [showModal, setShowModal] = useState(false);
	const { slug } = useParams();

	let history = useHistory();

	const handleClickRating = () => {
		if (userInfo && userInfo.token) {
			setShowModal(true);
		} else {
			history.push({
				pathname: '/login',
				state: { from: `/product/${slug}` },
			});
		}
	};

	const RenderRatingModal = useMemo(() => {
		return (
			<Modal
				title='Please leave your rating for this product'
				centered
				visible={showModal}
				onOk={() => {
					setShowModal(false);
				}}
				onCancel={() => {
					setShowModal(false);
				}}>
				{children}
			</Modal>
		);
	}, [showModal, setShowModal, star]);

	return (
		<Fragment>
			<div onClick={handleClickRating}>
				<StarOutlined className='text-danger' />
				<br />
				{userInfo ? 'Rate this product' : 'Login to rate this product'}
			</div>
			{RenderRatingModal}
		</Fragment>
	);
};

export default memo(RatingModal);
