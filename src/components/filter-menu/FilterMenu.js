import React, { Fragment, useMemo, memo } from 'react';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
	DollarCircleOutlined,
	ProjectOutlined,
	StarOutlined,
	TagOutlined,
	BorderlessTableOutlined,
	BgColorsOutlined,
	CarOutlined,
} from '@ant-design/icons';
import RatingOptions from '../ratings/RatingOptions';
import { COLOR, BRAND, SHIPPING } from '../../static/Data';

const { SubMenu, ItemGroup } = Menu;

const FilterMenu = ({
	price,
	handleSliderChange,
	category,
	categoryIds,
	handleCategoryCheck,
	handleClickStarOption,
	subCategory,
	handleClickSubOption,
	selectedBrand,
	handleSelectBrandOption,
	selectedColor,
	handleSelectColorOption,
	selectedShipping,
	handleSelectShippingOption,
}) => {
	const renderCategoryCheckBox = useMemo(() => {
		if (category) {
			return category.map((category) => (
				<div key={category._id}>
					<Checkbox
						className='pb-2 pl-4 pr-4'
						value={category._id}
						name='category'
						onChange={handleCategoryCheck}
						checked={categoryIds.includes(category._id)}>
						{category.name}
					</Checkbox>
				</div>
			));
		}
	}, [categoryIds, category]);

	const showStarOptions = () => {
		let options = [];
		for (let i = 5; i >= 0; i--) {
			options.push(
				<RatingOptions
					key={i}
					starClick={handleClickStarOption}
					numberOfStars={i}
				/>
			);
		}
		return options;
	};

	const showSubOptions = useMemo(() => {
		if (subCategory) {
			return subCategory.map((sub) => (
				<div
					className='p-1 m-1 badge badge-primary sub-category-item'
					key={sub._id}
					onClick={() => {
						handleClickSubOption(sub);
					}}>
					{sub.name}
				</div>
			));
		}
	}, [subCategory]);

	const BrandOptions = () =>
		BRAND.map((brand, index) => (
			<Radio
				className='pb-1'
				key={index}
				value={brand}
				name={brand}
				checked={brand === selectedBrand}
				onChange={handleSelectBrandOption}>
				{brand}
			</Radio>
		));

	const ColorOptions = () =>
		COLOR.map((color, index) => (
			<Radio
				className='pb-1'
				key={index}
				value={color}
				name={color}
				checked={color === selectedColor}
				onChange={handleSelectColorOption}>
				{color}
			</Radio>
		));

	const ShippingOptions = () =>
		SHIPPING.map((shipping, index) => (
			<Checkbox
				className='pb-1 pr-5'
				key={index}
				value={shipping}
				name={shipping}
				checked={shipping === selectedShipping}
				onChange={handleSelectShippingOption}>
				{shipping}
			</Checkbox>
		));

	return (
		<Fragment>
			<h6 className='text-center'>Custom Search / Filters</h6>
			<Menu
				defaultOpenKeys={['price-slider', 'category', 'star']}
				mode='inline'>
				{/* Price Filter */}
				<SubMenu
					key='price-slider'
					title={
						<span className='h6'>
							<DollarCircleOutlined />
							Price
						</span>
					}>
					<div>
						<Slider
							className='ml-4 mr-4'
							tipFormatter={(value) => `$ ${value}`}
							range
							value={price}
							onChange={handleSliderChange}
							max='4999'
						/>
					</div>
				</SubMenu>
				{/* Category Filter */}
				<SubMenu
					key='category'
					title={
						<span className='h6'>
							<ProjectOutlined />
							Category
						</span>
					}>
					<div style={{ marginTop: '10px' }}>{renderCategoryCheckBox}</div>
				</SubMenu>
				{/* Stars Filter */}
				<SubMenu
					key='star'
					title={
						<span className='h6'>
							<StarOutlined />
							Ratings
						</span>
					}>
					<div style={{ marginTop: '10px' }}>
						<div className='pr-4 pl-4'>{showStarOptions()}</div>
					</div>
				</SubMenu>
				{/* Sub Category Filter */}
				<SubMenu
					key='sub-category'
					title={
						<span className='h6'>
							<TagOutlined />
							Sub Category
						</span>
					}>
					<div style={{ marginTop: '10px' }}>
						<div className='pr-4 pl-4'>{showSubOptions}</div>
					</div>
				</SubMenu>
				{/* Brand Filter */}
				<SubMenu
					key='brand'
					title={
						<span className='h6'>
							<BorderlessTableOutlined />
							Brands
						</span>
					}>
					<div style={{ marginTop: '10px' }}>
						<div className='pr-4 pl-4'>
							<BrandOptions />
						</div>
					</div>
				</SubMenu>
				{/* Color Filter */}
				<SubMenu
					key='color'
					title={
						<span className='h6'>
							<BgColorsOutlined />
							Colors
						</span>
					}>
					<div style={{ marginTop: '10px' }}>
						<div className='pr-4 pl-4'>
							<ColorOptions />
						</div>
					</div>
				</SubMenu>
				{/* Shipping Filter */}
				<SubMenu
					key='shipping'
					title={
						<span className='h6'>
							<CarOutlined />
							Shipping
						</span>
					}>
					<div style={{ marginTop: '10px' }}>
						<div className='pr-4 pl-4'>
							<ShippingOptions />
						</div>
					</div>
				</SubMenu>
			</Menu>
			<br />
			<br />
		</Fragment>
	);
};

export default memo(FilterMenu);
