import React, { Fragment } from 'react';
import Input from '../input/Input';
import DropdownSelect from '../select/DropdownSelect';
import { COLOR, BRAND, SHIPPING } from '../../static/Data';
import { Select } from 'antd';
const { Option } = Select;

const ProductUpdateForm = ({
	submitHandler,
	onChangeHandler,
	values,
	categories,
	subCategories,
	onCategoryChange,
	subsIdArray,
	setSubsIdArray,
}) => {
	const { title, description, price, category, shipping, quantity, color, brand } = values;

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
					selectedItem={shipping}
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
					selectedItem={color}
					onChangeHandler={onChangeHandler}
					defaultOption='Please Select'
				/>
				<DropdownSelect
					items={BRAND}
					label='Brand'
					name='brand'
					selectedItem={brand}
					onChangeHandler={onChangeHandler}
					defaultOption='Please Select'
				/>
				<DropdownSelect
					items={categories}
					label='Select Category'
					name='category'
					selectedItem={category._id}
					onChangeHandler={onCategoryChange}
					defaultOption='Please Select'
				/>
				<Fragment>
					<label>Sub Category</label>
					<Select
						mode='multiple'
						style={{ width: '100%' }}
						placeholder='Please select'
						name='subCategory'
						value={subsIdArray}
						onChange={(value) => setSubsIdArray(value)}>
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
				<br />
				<button className='btn btn-outline-info mt-2'>Save</button>
			</form>
		</Fragment>
	);
};

export default ProductUpdateForm;
