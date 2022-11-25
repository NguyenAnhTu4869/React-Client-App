import React from 'react';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

export const LoginButton = ({ email, password, handleSubmit }) => {
	return (
		<Button
			onClick={handleSubmit}
			type='primary'
			block
			shape='round'
			className='mb-3'
			icon={<MailOutlined />}
			size='large'
			disabled={!email || password.length < 6}>
			Login with Email/Password
		</Button>
	);
};
