import React, { useState, useEffect } from 'react';
import { successNotify, errorNotify } from '../../../components/modal/ToastNotification';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { createProduct } from '../../../services/product-service';
import { getAllCategories, getSubsByParent } from '../../../services/category-service';

const initialValue = {
	title: 'Laptop',
	description: 'This is the best product',
	price: '100',
	category: '',
	subCategory: [],
	shipping: 'Yes',
	quantity: '50',
	images: [],
	color: '',
	brand: '',
};

const ProductCreate = ({ location }) => {
	const [product, setProduct] = useState(initialValue);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [showSubsOption, setShowSubsOption] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getAllCategories().then((res) => setCategories(res.data));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct({ ...product }, admin.token)
			.then((res) => {
				setProduct(({ ...prev }) => ({ ...initialValue }));
				successNotify(`"${res.data.title}" is created!`);
				window.setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.catch((error) => errorNotify(error.response.data));
	};

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const getSubsOnCategoryChange = (e) => {
		e.preventDefault();
		setProduct({ ...product, subCategory: [], category: e.target.value });
		getSubsByParent(e.target.value, setSubCategories);
		setShowSubsOption(true);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Create Product</h4>
					<hr />
					<FileUpload
						value={product}
						setValue={setProduct}
					/>
					<ProductCreateForm
						submitHandler={handleSubmit}
						onChangeHandler={handleChange}
						values={product}
						categories={categories}
						subCategories={subCategories}
						setValues={setProduct}
						showSubCategory={showSubsOption}
						onCategoryChange={getSubsOnCategoryChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
