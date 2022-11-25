import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { uploadFileToCloudinary, removeImage } from '../../services/upload-file';
import axios from 'axios';
import { Image, Badge } from 'antd';
import { DeleteFilled, LoadingOutlined } from '@ant-design/icons';
const PreviewGroup = Image.PreviewGroup;

const FileUpload = ({ value, setValue }) => {
	const [loading, setLoading] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	let { images } = { ...value };

	const fileUploadAndResize = (e) => {
		e.preventDefault();
		let imageFiles = e.target.files;
		setLoading(true);
		if (imageFiles) {
			for (let i = 0; i < imageFiles.length; i++) {
				Resizer.imageFileResizer(
					imageFiles[i],
					720,
					720,
					'JPEG',
					100,
					0,
					(uri) => {
						uploadFileToCloudinary(uri, admin.token)
							.then((res) => {
								images.push(res.data);
								/** Update product state images */
								setValue({ ...value, images });
								setLoading(false);
							})
							.catch((error) => {
								console.log(error);
								setLoading(false);
							});
					},
					'base64'
				);
			}
		}
	};

	const handleRemoveImage = (public_id) => {
		setLoading(true);
		console.log('Remove Image: ', public_id);
		removeImage(public_id, admin.token)
			.then((res) => {
				/** Filter remove image from state */
				images = images.filter((image) => {
					return image.public_id !== public_id;
				});
				setValue({ ...value, images });
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const showUploadedImages = () => {
		if (images.length > 0) {
			return images.map((image) => (
				<div
					key={image.public_id}
					className='m-3 pb-3'>
					<Badge
						style={{ cursor: 'pointer' }}
						count={
							<DeleteFilled
								style={{ color: '#596275', fontSize: '16px' }}
								onClick={() => {
									handleRemoveImage(image.public_id);
								}}
							/>
						}>
						<Image
							width={150}
							height={110}
							shape='square'
							style={{ borderRadius: '25%' }}
							src={image.url}
						/>
					</Badge>
				</div>
			));
		} else {
			return null;
		}
	};

	return (
		<Fragment>
			<div className='row'>
				<label
					className='btn btn-info btn-raised m-3'
					style={{ color: '#dff9fb' }}>
					Upload Image {loading ? <LoadingOutlined /> : null}
					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
			<div className='row'>
				<PreviewGroup>{images.length > 0 && showUploadedImages()}</PreviewGroup>
			</div>
		</Fragment>
	);
};

export default FileUpload;
