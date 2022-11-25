import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import { getSubCategory, updateSubCategory } from '../../../services/sub-category-service';
import { getAllCategories } from '../../../services/category-service';
import InputForm from '../../../components/forms/InputForm';
import DropdownSelect from '../../../components/select/DropdownSelect';
import { errorNotify, successNotify } from '../../../components/modal/ToastNotification';

const SubCategoryUpdate = ({ history, match }) => {
	const [subCategoryName, setSubCategoryName] = useState('');
	const [parentCategory, setParentCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	const { user: admin } = useSelector((state) => ({ ...state }));

	const { slug } = match.params;

	useEffect(() => {
		fetchAllCategories();
		fetchSubCategory();
	}, []);

	const fetchAllCategories = () => getAllCategories().then((res) => setCategories(res.data));

	const fetchSubCategory = () =>
		getSubCategory(slug).then((res) => {
			setSubCategoryName(res.data.name);
			setParentCategory(res.data.parentCategory);
		});

	/** Handle form submit to create category */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(subCategoryName);
		updateSubCategory(slug, subCategoryName, parentCategory, admin.token)
			.then((res) => {
				setSubCategoryName('');
				successNotify(`Sub category "${res.data.name}" is updated!`);
				history.push('/admin/sub-category');
			})
			.catch((error) => {
				const status = error.response.status;
				const message = error.response.data;
				if (status === 400) {
					errorNotify(message);
				}
				if (status === 409) {
					errorNotify(message);
				}
			});
		setLoading(false);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4>Update Sub Category</h4>
					<DropdownSelect
						clazzName='text-info font-weight-bold'
						items={categories}
						selectedItem={parentCategory}
						setValue={setParentCategory}
						label='Select Category'
						name='category'
					/>
					<InputForm
						handleSubmit={handleSubmit}
						value={subCategoryName}
						setValue={setSubCategoryName}
						isLoading={loading}
						btnName='Update'
						label='Sub Category Name'
						placeHolder='Enter new subcategory name'
					/>
				</div>
			</div>
		</div>
	);
};

export default SubCategoryUpdate;
