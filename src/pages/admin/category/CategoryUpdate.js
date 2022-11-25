import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { successNotify, errorNotify } from '../../../components/modal/ToastNotification';
import AdminNav from '../../../components/navigation/AdminNav';
import { getCategory, updateCategory } from '../../../services/category-service';
import InputForm from '../../../components/forms/InputForm';

const CategoryUpdate = ({ history, match }) => {
	const [categoryName, setCategoryName] = useState('');
	const [loading, setLoading] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	const { slug } = match.params;

	useEffect(() => {
		fetchCategory();
	}, []);

	const fetchCategory = () =>
		getCategory(slug).then((res) => {
			setCategoryName(res.data.name);
			console.log(res.data);
		});

	/** Handle form submit to update category name */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(slug, categoryName, admin.token)
			.then((res) => {
				setCategoryName('');
				successNotify(`"${res.data.name}" is updated!`);
				history.push('/admin/category');
			})
			.catch((error) => {
				const status = error.response.status;
				const message = error.response.data;
				if (status === 400) {
					errorNotify(`${message}: ${categoryName}`);
				} else if (status === 404) {
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
					<h4>Update Category Name</h4>
					<InputForm
						handleSubmit={handleSubmit}
						value={categoryName}
						setValue={setCategoryName}
						isLoading={loading}
						btnName='Update'
						placeHolder='Enter new category name'
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
