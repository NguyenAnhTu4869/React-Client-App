import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { saveProductComment } from '../../services/comment-service';
import { warningNotify, errorNotify } from '../../components/modal/ToastNotification';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

const Comments = ({ productId, refreshComment, comments }) => {
	const [userComment, setUserComment] = useState('');

	const { user } = useSelector((state) => ({ ...state }));

	const handleChange = (e) => {
		setUserComment(e.currentTarget.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!user) {
			warningNotify('Please login to comment!');
			return;
		}
		if (!userComment) {
			errorNotify('Please write your comment');
			return;
		}
		saveProductComment(
			{
				content: userComment,
				productId,
			},
			user.token
		).then((res) => {
			if (res.data.success) {
				setUserComment('');
				refreshComment();
			} else {
				errorNotify('Failed to post your comment!');
			}
		});
	};

	const filterReplyComments = (comments, rootId) => {
		if (comments) {
			return comments.filter((comment) => {
				return comment.parentComment === rootId || comment.parentComment;
			});
		}
	};

	return (
		<div>
			<br />
			<b>Users reviews and questions</b>
			<hr />
			{/*Comment lits*/}
			{comments &&
				comments.map(
					(comment) =>
						!comment.replyTo &&
						!comment.parentComment && (
							<Fragment key={comment._id}>
								<SingleComment
									comment={comment}
									productId={productId}
									refreshComment={refreshComment}
								/>
								<ReplyComment
									comments={filterReplyComments(comments, comment._id)}
									productId={productId}
									refreshComment={refreshComment}
									parentId={comment._id}
								/>
							</Fragment>
						)
				)}

			{/*Root comment form*/}
			<form
				style={{ width: '100%' }}
				onSubmit={handleSubmit}>
				<hr />
				<div className='row'>
					<div className='col-lg-10 col-md-9'>
						<TextArea
							style={{ width: '100%', borderRadius: '10px' }}
							onChange={handleChange}
							value={userComment}
							placeholder='write your comment'
						/>
					</div>
					<div className='col-lg-2 col-md-3 pt-2'>
						<Button
							style={{ width: '100%', height: '40px'}}
							shape='round'
							size='small'
							type='primary'
							onClick={handleSubmit}>
							Send
							<span style={{ paddingLeft: '5px' }}>
								<SendOutlined />
							</span>
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Comments;
