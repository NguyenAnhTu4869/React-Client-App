import React from 'react';

const SearchForm = ({ searchKey, setSearchKey, placeHolder, type }) => {
	const searchChangeHandler = (e) => {
		e.preventDefault();
		setSearchKey(e.target.value);
	};

	return (
		<input
			className='form-control mb-4'
			type={type}
			placeholder={placeHolder}
			value={searchKey}
			onChange={searchChangeHandler}
		/>
	);
};

export default SearchForm;
