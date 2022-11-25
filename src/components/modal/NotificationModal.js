import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_MODAL_VISIBILITY } from '../../reducers/actions/types';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-40%',
		transform: 'translate(-50%, -50%)',
		width: '25rem',
		textAlign: 'center',
	},
};

Modal.setAppElement('#root');

const NotificationModal = ({ title, message, handleClickYes }) => {
	const { modal } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
	};

	return (
		<Modal
			isOpen={modal}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			style={customStyles}
			contentLabel='Modal'>
			<h6>{title}</h6>
			<p>{message}</p>
			<button
				className='btn btn-info'
				onClick={handleClickYes}>
				Yes
			</button>
			<button
				className='btn btn-danger'
				onClick={closeModal}>
				close
			</button>
		</Modal>
	);
};

export default NotificationModal;
