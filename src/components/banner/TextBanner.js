import React from 'react';

const TextBanner = ({ text }) => (
	<div className='container-fluid'>
		<h4
			id='new-arrivals'
			className='text-center p-4 mt-3 mb-4 display-3 jumbotron font-weight-bold'
			style={{
				color: '#e77f67',
				textShadow: '4px 4px #b2bec3',
				background: '#dff9fb',
				borderRadius: '20px',
				boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
			}}>
			{text}
		</h4>
	</div>
);

export default TextBanner;
