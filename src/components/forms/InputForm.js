import React from 'react';
import Input from '../input/Input';

const InputForm = ({
	btnName,
	label,
	placeHolder,
	value,
	setValue,
	isLoading,
	handleSubmit,
}) => (
	<form onSubmit={handleSubmit}>
		<Input
			clazzName='pt-2'
			type='text'
			value={value}
			placeHolder={placeHolder}
			onChangeHandler={(e) => setValue(e.target.value)}
			autoFocus
			required
			label={label}
			isLoading={isLoading}
			spinner={<i className='fa-solid fa-spinner text-info' />}
		/>
		<div>
			<button className='btn btn-outline-primary mt-2'>{btnName}</button>
		</div>
	</form>
);

export default InputForm;
