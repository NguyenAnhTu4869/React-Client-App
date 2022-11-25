import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import {
	createSubCategory,
	getAllSubCategories,
	deleteSubCategory,
} from '../../../services/sub-category-service';
import { getAllCategories } from '../../../services/category-service';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NotificationModal from '../../../components/modal/NotificationModal';
import { SET_MODAL_VISIBILITY } from '../../../reducers/actions/types';
import InputForm from '../../../components/forms/InputForm';
import SearchForm from '../../../components/forms/SearchForm';
import DropdownSelect from '../../../components/select/DropdownSelect';
import {
	errorNotify,
	successNotify,
	warningNotify,
} from '../../../components/modal/ToastNotification';

const SubCategoryCreate = () => {
	const [subCategoryName, setSubCategoryName] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [delSubSlug, setDelSubSlug] = useState('');
	const [searchKey, setSearchKey] = useState('');

	const { user: admin } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		fetchAllCategories();
		fetchAllSubCategories();
	}, []);

	const fetchAllCategories = () => getAllCategories().then((res) => setCategories(res.data));

	const fetchAllSubCategories = () =>
		getAllSubCategories().then((res) => setSubCategories(res.data));

	/** Handle delete category */
	const handleClickDelete = (slug) => {
		setDelSubSlug(slug);
		dispatch({ type: SET_MODAL_VISIBILITY, payload: true });
	};

	const handleClickYes = () => {
		setLoading(true);
		deleteSubCategory(delSubSlug, admin.token)
			.then((res) => {
				warningNotify(`Sub category "${delSubSlug.toUpperCase()}" is deleted!`);
				fetchAllSubCategories();
				dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
				setLoading(false);
			})
			.catch((error) => {
				const status = error.response.status;
				const message = error.response.data;
				if (status === 400) {
					errorNotify(`${message}: ${subCategoryName}`);
				} else if (status === 404) {
					errorNotify(message);
				}
				setLoading(false);
			});
	};

	/** Handle search */
	const searchCategory = (keyword) => (category) => category.name.toLowerCase().includes(keyword);

	const showSubCategories = () => {
		if (subCategories) {
			return subCategories.filter(searchCategory(searchKey.toLowerCase())).map((sub) => (
				<div
					key={sub._id}
					className='alert alert-secondary mt-1'>
					{sub.name}{' '}
					<span
						className='btn btn-sm float-right text-danger'
						onClick={() => handleClickDelete(sub.slug)}>
						<DeleteOutlined />
					</span>
					<Link to={`/admin/sub-category-update/${sub.slug}`}>
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
		createSubCategory(subCategoryName, categoryId, admin.token)
			.then((res) => {
				setSubCategoryName('');
				successNotify(`"${res.data.name}" is created!`);
				fetchAllSubCategories();
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
					<h4>Create Sub Category</h4>
					<DropdownSelect
						clazzName='text-info font-weight-bold'
						items={categories}
						setValue={setCategoryId}
						label='Select Category'
						name='category'
						defaultOption='Please Select root category'
					/>
					<InputForm
						handleSubmit={handleSubmit}
						value={subCategoryName}
						setValue={setSubCategoryName}
						isLoading={loading}
						btnName='Create'
						label='Sub Category Name'
						placeHolder='Enter sub category name'
					/>
					<SearchForm
						searchKey={searchKey}
						setSearchKey={setSearchKey}
						placeHolder='Search'
						type='search'
					/>
					{showSubCategories()}
				</div>
			</div>
			<NotificationModal
				title={'Remove Sub Category'}
				message={'Are you sure to delete this sub category?'}
				handleClickYes={handleClickYes}
			/>
		</div>
	);
};

export default SubCategoryCreate;
