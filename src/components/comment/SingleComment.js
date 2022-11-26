import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Button, Input, Avatar, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import {
	saveProductComment,
	updateProductCommnet,
	removeProductComment,
} from '../../services/comment-service';
import { warningNotify, errorNotify, successNotify } from '../modal/ToastNotification';
import { getTimeDuration } from '../../services/helper/utils';
import UserAvatar from '../../images/user_avatar.png';

const { TextArea } = Input;

const SingleComment = ({ comment, productId, refreshComment }) => {
	const [commentValue, setCommentValue] = useState('');
	const [openReply, setOpenReply] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const { content, writtenBy, _id } = comment;

	const date = new Date(comment.createdAt);
	const tooltipTitle = `${date.toDateString()} ${date.toTimeString()}`;
	const { hours, minutes, seconds } = getTimeDuration(new Date(), date);
	const commentTime = hours > 0 ? `${hours}h` : `${minutes}m${seconds}s`;
	const isUser = user === null ? true : comment.writtenBy._id !== user._id;

	const handleChange = (e) => {
		setCommentValue(e.currentTarget.value);
	};

	const handleOpenReply = () => {
		setOpenReply((prev) => !prev);
	};

	const handleOpenEdit = () => {
		setOpenEdit((prev) => !prev);
		setCommentValue(comment.content);
	};

	const handleRemoveComment = () => {
		removeProductComment(_id, user.token).then((res) => {
			if (res.status === 204) {
				successNotify('Your comment is removed');
				refreshComment();
			} else errorNotify('Failed to remove your comment. Please try again');
		});
	};

	const handleEditComment = () => {
		updateProductCommnet(_id, user.token, commentValue).then((res) => {
			if (res.data.success) {
				successNotify('Your comment is updated');
				refreshComment();
				setOpenEdit((prev) => !prev);
			} else {
				errorNotify('Failed to update your comment. Please try again!');
			}
		});
	};

	const handlePostComment = (e) => {
		e.preventDefault();
		if (!user) {
			warningNotify('Please login to comment!');
			return;
		}
		saveProductComment(
			{
				content: commentValue,
				productId,
				parentComment: _id,
				replyTo: writtenBy._id,
			},
			user.token
		).then((res) => {
			if (res.data.success) {
				setCommentValue('');
				refreshComment();
				setOpenReply((prev) => !prev);
			} else {
				errorNotify('Failed to post your comment!');
			}
		});
	};

	const actions = [
		<span
			className='text-primary'
			onClick={handleOpenReply}
			key='comment-basic-reply-to'>
			Reply to
		</span>,
		<span
			className='text-info'
			hidden={hours >= 1 || isUser}
			onClick={handleOpenEdit}
			key='comment-basic-edit'>
			Edit
		</span>,
		<span
			className='text-danger'
			hidden={(hours === 0 && minutes > 30) || hours >= 1 || isUser}
			onClick={handleRemoveComment}
			key='comment-basic-remove'>
			Remove
		</span>,
	];

	return (
		<div>
			<Comment
				actions={actions}
				author={writtenBy.name}
				content={content}
				datetime={
					<Tooltip title={tooltipTitle}>
						<span>
							{comment.replyTo && <span>Reply to {comment.replyTo.name}</span>} {commentTime} ago
						</span>
					</Tooltip>
				}
				avatar={
					<Avatar
						src={UserAvatar}
						alt='image'
					/>
				}
			/>

			{openEdit && (
				<form
					style={{ width: '100%' }}
					onSubmit={handleEditComment}>
					<div className='row'>
						<div className='col-lg-10 col-md-9'>
							<TextArea
								style={{ width: '100%', borderRadius: '10px' }}
								onChange={handleChange}
								value={commentValue}
							/>
						</div>
						<div className='col-lg-2 col-md-3 pt-2'>
							<Button
								style={{ width: '100%', height: '40px' }}
								shape='round'
								size='small'
								type='primary'
								onClick={handleEditComment}>
								Edit
								<span style={{ paddingLeft: '5px' }}>
									<SendOutlined />
								</span>
							</Button>
						</div>
					</div>
				</form>
			)}

			{openReply && (
				<form
					style={{ width: '100%' }}
					onSubmit={handlePostComment}>
					<div className='row'>
						<div className='col-lg-10 col-md-9'>
							<TextArea
								style={{ width: '100%', borderRadius: '10px' }}
								onChange={handleChange}
								value={commentValue}
								placeholder='write your reply comment'
							/>
						</div>
						<div className='col-lg-2 col-md-3 pt-2'>
							<Button
								style={{ width: '100%', height: '40px' }}
								shape='round'
								size='small'
								type='primary'
								onClick={handlePostComment}>
								Reply
								<span style={{ paddingLeft: '5px' }}>
									<SendOutlined />
								</span>
							</Button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default SingleComment;
