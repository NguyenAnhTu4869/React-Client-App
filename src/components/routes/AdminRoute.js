import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingForRedirect from './LoadingForRedirect';
import { checkCurrentAdmin } from '../../services/auth-service';
import { warningNotify } from '../modal/ToastNotification';

/** Private admin route - only display the page when the admin already login and validate */
const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [isAdmin, setIsAdmin] = useState(false);

	let isUserLogin = user && user.token ? true : false;

	useEffect(() => {
		if (isUserLogin) {
			checkCurrentAdmin(user.token)
				.then((res) => {
					if (res.data.role === 'admin') setIsAdmin(true);
				})
				.catch((error) => {
					warningNotify('Your session is expired 😥 Please reload page');
					console.log(error);
					setIsAdmin(false);
				});
		}
	}, [user, isUserLogin]);

	const renderUserRoute = isAdmin ? <Route {...rest}></Route> : <LoadingForRedirect />;

	return renderUserRoute;
};

export default AdminRoute;
