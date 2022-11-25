import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { PRODUCT_FILTER } from '../../reducers/actions/types';
import Input from '../input/Input';

const SearchBar = () => {
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;
	const dispatch = useDispatch();

	const history = useHistory();

	const handleChange = (e) => {
		dispatch({
			type: PRODUCT_FILTER,
			payload: { text: e.target.value },
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/shop/search?${text}`);
	};

	return (
		<form
			className='form-inline my-2 my-lg-0'
			onSubmit={handleSubmit}>
			<Input
				className='mr-sm-2'
				type='search'
				value={text}
				placeHolder='Search...'
				onChangeHandler={handleChange}
			/>
			<SearchOutlined
				onClick={handleSubmit}
				style={{ cursor: 'pointer' }}
			/>
		</form>
	);
};

export default SearchBar;
