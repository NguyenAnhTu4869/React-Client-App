import React, { useState, useEffect } from 'react';
import { auth } from '../../services/fire-base/firebase';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { errorNotify, successNotify } from '../../components/modal/ToastNotification';

const promptErrMsg = (error) => {
	let errMsg = error.message;
	if (errMsg.includes('(auth/user-not-found)')) {
		errorNotify('Your email was not found');
	}
	if (errMsg.includes('(auth/invalid-email)')) {
		errorNotify('Your email is not valid');
	}
};

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true,
		};

		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
				setLoading(false);
				successNotify('Please check your email to reset password');
			})
			.catch((error) => {
				setLoading(false);
				promptErrMsg(error);
			});
	};

	return (
		<div className='container col-md-6 offset-md-3 p-5'>
			{loading ? (
				<h5 className='text-danger'>
					Processing...
					<LoadingOutlined className='ml-2' />
				</h5>
			) : (
				<h4>Forgot Password</h4>
			)}

			<form onSubmit={handleSubmit}>
				<input
					type='email'
					className='form-control'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Type your email'
					autoFocus
				/>
				<br />
				<button
					className='btn btn-raised'
					disabled={!email}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
