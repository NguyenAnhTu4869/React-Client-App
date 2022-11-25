import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingForRedirect = () => {
	const [countDown, setCountDown] = useState(5);
	const history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown((currentCountDown) => --currentCountDown);
		}, 1000);

		/** Redirect to home page after count down to 0 */
		countDown === 0 && history.push('/');

		return () => clearInterval(interval);
	}, [countDown, history]);

	return (
		<div className='container p-5 text-center'>
			<p>Redirect You In {countDown} seconds</p>
		</div>
	);
};

export default LoadingForRedirect;
