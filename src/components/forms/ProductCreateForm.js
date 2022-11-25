import React, { Fragment } from 'react';
import Input from '../input/Input';
import DropdownSelect from '../select/DropdownSelect';
import { Select } from 'antd';
import { COLOR, BRAND, SHIPPING } from '../../static/Data';

const { Option } = Select;

const ProductCreateForm = ({
	submitHandler,
	onChangeHandler,
	values,
	showSubCategory,
	setValues,
	categories,
	subCategories,
	onCategoryChange,
}) => {
	const { title, description, price, subCategory, quantity } = values;

	return (
		<Fragment>
			<form onSubmit={submitHandler}>
				<Input
					label='Title'
					type='text'
					name='title'
					value={title}
					onChangeHandler={onChangeHandler}
				/>
				<Input
					label='Description'
					type='text'
					name='description'
					value={description}
					onChangeHandler={onChangeHandler}
				/>
				<Input
					label='Price'
					type='text'
					name='price'
					value={price}
					onChangeHandler={onChangeHandler}
				/>
				<DropdownSelect
					items={SHIPPING}
					label='Shipping'
					name='shipping'
					onChangeHandler={onChangeHandler}
					defaultOption='Please Select'
				/>
				<Input
					label='Quantity'
					type='number'
					name='quantity'
					value={quantity}
					onChangeHandler={onChangeHandler}
				/>
				<DropdownSelect
					items={COLOR}
					label='Color'
					name='color'
					onChangeHandler={onChangeHandler}
					defaultOption='Please Select'
				/>
				<DropdownSelect
					items={BRAND}
					label='Brand'
					name='brand'
					onChangeHandler={onChangeHandler}
					defaultOption='Please Select'
				/>
				<DropdownSelect
					items={categories}
					onChangeHandler={onCategoryChange}
					label='Select Category'
					name='category'
					defaultOption='Please Select'
				/>
				{showSubCategory && (
					<Fragment>
						<label>Sub Category</label>
						<Select
							mode='multiple'
							style={{ width: '100%' }}
							placeholder='Please select'
							name='subCategory'
							value={subCategory}
							onChange={(value) => setValues({ ...values, subCategory: value })}>
							{subCategories.length > 0 &&
								subCategories.map((sub) => (
									<Option
										value={sub._id}
										key={sub._id}>
										{sub.name}
									</Option>
								))}
						</Select>
					</Fragment>
				)}
				<br />
				<button className='btn btn-outline-info mt-2'>Save</button>
			</form>
		</Fragment>
	);
};

export default ProductCreateForm;
