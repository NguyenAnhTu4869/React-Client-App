import React from 'react';

const Input = ({
	type,
	label,
	placeHolder,
	name,
	value,
	isLoading,
	onChangeHandler,
	clazzName,
	autoFocus,
	required,
	spinner,
}) => {
	const className = 'form-control ' + `${clazzName ? clazzName : ''}`;
	return (
		<div className='form-group'>
			<label>
				{label} {isLoading && spinner}
			</label>
			<input
				className={className.trim()}
				type={type}
				name={name}
				value={value}
				placeholder={placeHolder}
				onChange={onChangeHandler}
				autoFocus={autoFocus}
				required={required}
			/>
		</div>
	);
};

export default Input;
