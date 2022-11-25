import React, { useState, useEffect } from 'react';
import { auth } from '../../services/fire-base/firebase';
import { useSelector } from 'react-redux';
import { successNotify } from '../../components/modal/ToastNotification';

const Register = ({ history }) => {
	const [email, setEmail] = useState('');

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		/** Send confirmation email once the user submit registration form */
		await auth.sendSignInLinkToEmail(email, config);
		successNotify(`Email is sent to ${email}. Click the link to complete your registration.`);
		/** Store user email in local storage */
		window.localStorage.setItem('emailForRegistration', email);
		/** Reset Email Input Field */
		setEmail('');
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				className='form-control'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='Please enter your email'
				autoFocus
			/>

			<br />
			<button
				type='submit'
				className='btn btn-raised'>
				Register
			</button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register</h4>
					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
