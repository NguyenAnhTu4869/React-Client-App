import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import {
	createCategory,
	getAllCategories,
	deleteCategory,
} from '../../../services/category-service';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
	successNotify,
	warningNotify,
	errorNotify,
} from '../../../components/modal/ToastNotification';
import NotificationModal from '../../../components/modal/NotificationModal';
import { SET_MODAL_VISIBILITY } from '../../../reducers/actions/types';
import InputForm from '../../../components/forms/InputForm';
import SearchForm from '../../../components/forms/SearchForm';

const CategoryCreate = () => {
	const [categoryName, setCategoryName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [delCategorySlug, setDelCategorySlug] = useState('');
	const [searchKey, setSearchKey] = useState('');

	const { user: admin } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		fetchAllCategories();
	}, []);

	const fetchAllCategories = () => getAllCategories().then((res) => setCategories(res.data));

	/** Handle delete category */
	const handleClickDelete = (slug) => {
		setDelCategorySlug(slug);
		dispatch({ type: SET_MODAL_VISIBILITY, payload: true });
	};

	const handleClickYes = () => {
		setLoading(true);
		deleteCategory(delCategorySlug, admin.token)
			.then((res) => {
				fetchAllCategories();
				warningNotify(`Category "${delCategorySlug.toUpperCase()}" is deleted!`);
				dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
				setLoading(false);
			})
			.catch((error) => {
				const status = error.response.status;
				const message = error.response.data;
				if (status === 400) {
					errorNotify(`${message}: ${categoryName}`);
				} else if (status === 404) {
					errorNotify(message);
				}
				setLoading(false);
			});
	};

	/** Handle search */
	const searchCategory = (keyword) => (category) => category.name.toLowerCase().includes(keyword);

	const showCategories = () => {
		if (categories) {
			return categories.filter(searchCategory(searchKey.toLowerCase())).map((category) => (
				<div
					key={category._id}
					className='alert alert-secondary mt-1'>
					{category.name}{' '}
					<span
						className='btn btn-sm float-right text-danger'
						onClick={() => handleClickDelete(category.slug)}>
						<DeleteOutlined />
					</span>
					<Link to={`/admin/category-update/${category.slug}`}>
						<span className='btn btn-sm float-right text-info'>
							<EditOutlined />
						</span>
					</Link>
				</div>
			));
		}
	};

	/** Handle form submit to create category */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory(categoryName, admin.token)
			.then((res) => {
				setCategoryName('');
				successNotify(`"${res.data.name}" is created!`);
				fetchAllCategories();
			})
			.catch((error) => errorNotify(error.response.data));
		setLoading(false);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4>Create Category</h4>
					<InputForm
						handleSubmit={handleSubmit}
						value={categoryName}
						setValue={setCategoryName}
						isLoading={loading}
						btnName='Create'
						label='Category Name'
						placeHolder='Enter category name'
					/>
					<SearchForm
						searchKey={searchKey}
						setSearchKey={setSearchKey}
						placeHolder='Search'
						type='search'
					/>
					<hr />
					<div
						className='pt-1'
						style={{ height: '500px', overflow: 'scroll' }}>
						{showCategories()}
					</div>
				</div>
			</div>
			<NotificationModal
				title={'Remove Category'}
				message={'Are you sure to delete this category?'}
				handleClickYes={handleClickYes}
			/>
		</div>
	);
};

export default CategoryCreate;
