import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

export const GoogleLoginButton = ({ loginWithGoogle }) => {
	return (
		<Button
			onClick={loginWithGoogle}
			type='danger'
			className='mb-3'
			block
			shape='round'
			icon={<GoogleOutlined />}
			size='large'>
			Login with Google
		</Button>
	);
};
