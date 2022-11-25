import { Card } from 'antd';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';
import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemoveProduct, onClickDelete }) => {
	const { title, description, images, slug } = product;

	return (
		<Fragment>
			<Card
				hoverable
				style={{ cursor: 'pointer', textAlign: 'center' }}
				cover={
					<img
						src={images && images.length ? images[0].url : laptop}
						style={{
							height: '180px',
							objectFit: 'cover',
						}}
						className='p-1'
					/>
				}
				actions={[
					<Link to={`/admin/product/${slug}`}>
						<EditTwoTone />
					</Link>,
					<DeleteOutlined
						className='text-danger'
						// onClick={() => handleRemoveProduct(slug)}
						onClick={() => onClickDelete(slug)}
					/>,
				]}>
				<Meta
					title={title}
					description={`${description && description.substring(0, 24)}...`}
				/>
			</Card>
		</Fragment>
	);
};

export default AdminProductCard;
