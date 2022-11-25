import React, { useState, useEffect } from 'react';
import { auth } from '../../services/fire-base/firebase';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../services/auth-service';
import { LOGIN_USER } from '../../reducers/actions/types';
import { errorNotify, successNotify } from '../../components/modal/ToastNotification';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		/** Validate Email and Password */
		if (!email || !password) {
			errorNotify('Email and password is required');
			return;
		}

		if (password.length < 6) {
			errorNotify('Password must be at least 6 characters long');
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(email, window.location.href);
			if (result.user.emailVerified) {
				/** Remove email from localstorage */
				window.localStorage.removeItem('emailForRegistration');
				/** Update User Password and Get User IDToken */
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
				/** Send Request To BE To Create New User */
				createOrUpdateUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: LOGIN_USER,
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
						successNotify(`Hi ${res.data.name} 👋 Welcome To TechShop`);
					})
					.catch((error) => console.error(error.message));
				/** Redirect User To Home Page */
				history.push('/');
				successNotify('Your registration is completed 👍 Please login to your account');
			}
		} catch (error) {
			errorNotify(error.message);
		}
	};

	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				className='form-control'
				value={email}
				disabled
			/>
			<input
				type='password'
				className='form-control'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
				autoFocus
			/>
			<br />
			<button
				type='submit'
				className='btn btn-raised'>
				Complete Registration
			</button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register Complete</h4>
					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
