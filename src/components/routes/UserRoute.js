import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingForRedirect from './LoadingForRedirect';

/** Private user route - only display the page when the user already login */
const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));

	let isUserLogin = user && user.token ? true : false;

	const renderUserRoute = isUserLogin ? (
		<Route {...rest}></Route>
	) : (
		<LoadingForRedirect />
	);

	return renderUserRoute;
};

export default UserRoute;
