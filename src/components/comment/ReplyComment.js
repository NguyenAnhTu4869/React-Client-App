import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = ({ productId, refreshComment, comments, parentId, limitReply = false }) => {
	const [replyComments, setReplyComments] = useState([]);
	const [childrenComments, setChildrenComments] = useState([]);
	const [countReply, setCountReply] = useState(0);
	const [showReplies, setShowReplies] = useState(false);

	useEffect(() => {
		if (comments) {
			let replies = comments.filter((c) => {
				return c.parentComment === parentId;
			});
			setReplyComments(replies);
			setCountReply(replies.length);
			setChildrenComments(
				comments.filter((c) => {
					return c.parentComment !== parentId;
				})
			);
		}
	}, [comments]);

	const handleClick = () => {
		setShowReplies((prev) => !prev);
	};

	const ShowMoreComments = () => (
		<p
			style={{
				fontSize: '14px',
				margin: 0,
				color: 'gray',
				cursor: 'pointer',
				paddingBottom: '10px',
			}}
			onClick={handleClick}>
			View {countReply} more comment(s)
		</p>
	);

	const renderReplyComment = () => {
		if (replyComments.length > 0) {
			return replyComments.map((replyComment) => (
				<div
					key={replyComment._id}
					style={{ marginLeft: '20px' }}>
					<SingleComment
						comment={replyComment}
						productId={productId}
						refreshComment={refreshComment}
					/>
					<ReplyComment
						comments={childrenComments}
						refreshComment={refreshComment}
						productId={productId}
						parentId={replyComment._id}
						limitReply={true}
					/>
				</div>
			));
		}
	};

	return (
		<div>
			{countReply > 0 && <ShowMoreComments />}
			{showReplies && renderReplyComment()}
		</div>
	);
};

export default ReplyComment;
