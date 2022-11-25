import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import { UserOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons';
import { FaShoppingCart, FaShoppingBag, FaCartPlus, FaHome } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../forms/SearchBar';
import { LOGOUT_USER } from '../../reducers/actions/types';

const { SubMenu, Item } = Menu;
const iconStyle = { fontSize: '1.1rem', paddingTop: '2px' };

const Header = () => {
	const [current, setCurrent] = useState('home');

	let dispatch = useDispatch();
	/** Get user state from Redux Store */
	let { user, cart } = useSelector((state) => ({ ...state }));
	let history = useHistory();
	const isRoleAdmin = user && user.role === 'admin' ? true : false;
	const isRoleUser = user && user.role === 'subscriber' ? true : false;

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: LOGOUT_USER,
			payload: null,
		});
		history.push('/login');
	};

	const dashboardLink = () => {
		if (isRoleAdmin) {
			return (
				<Item>
					<Link to='/admin/dashboard'></Link>Dashboard
				</Item>
			);
		}
		if (isRoleUser) {
			return (
				<Item>
					<Link to='/user/history'></Link>Dashboard
				</Item>
			);
		}
	};

	return (
		<Menu
			onClick={handleClick}
			selectedKeys={[current]}
			mode='horizontal'>
			<Item
				key='home'
				icon={<FaHome style={iconStyle} />}>
				<Link to='/'>Home</Link>
			</Item>
			<Item
				key='shop'
				icon={<FaShoppingBag style={iconStyle} />}>
				<Link to='/shop'>Shop</Link>
			</Item>

			{user && user.role === 'subscriber' && (
				<Item
					key='cart'
					icon={<FaShoppingCart style={iconStyle} />}>
					<Link to='/cart'>Cart</Link>
					<Badge
						count={cart.length}
						size='small'
						offset={[-48, -20]}
					/>
				</Item>
			)}

			{user && user.role === 'subscriber' && (
				<Item
					key='wishlist'
					icon={<FaCartPlus style={iconStyle} />}>
					<Link to='/user/wishlist'>Wishlist</Link>
				</Item>
			)}

			{!user && (
				<Item
					key='register'
					icon={<UserAddOutlined />}
					className='float-right'>
					<Link to='/register'>Register</Link>
				</Item>
			)}

			{!user && (
				<Item
					key='login'
					icon={<UserOutlined />}
					className='float-right'>
					<Link to='/login'>Login</Link>
				</Item>
			)}

			{user && (
				<SubMenu
					icon={<MenuOutlined />}
					title={user.name}
					className='float-right'>
					{dashboardLink()}
					<Item onClick={logout}>Logout</Item>
				</SubMenu>
			)}
			<span className='float-right p-1'>
				<SearchBar />
			</span>
		</Menu>
	);
};

export default Header;
