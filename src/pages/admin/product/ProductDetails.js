import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { successNotify, errorNotify } from '../../../components/modal/ToastNotification';
import AdminNav from '../../../components/navigation/AdminNav';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { getProductInfo, updateProduct } from '../../../services/product-service';
import { getAllCategories, getSubsByParent } from '../../../services/category-service';

const initialValue = {
	title: '',
	description: '',
	price: '',
	category: '',
	subCategory: [],
	shipping: '',
	quantity: '',
	images: [],
	color: '',
	brand: '',
};

const ProductDetails = ({ match, history }) => {
	const [product, setProduct] = useState(initialValue);
	const [originalCategory, setOriginalCategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [subsIdArray, setSubsIdArray] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	const { slug } = match.params;

	useEffect(() => {
		getAllCategories().then((res) => setCategories(res.data));
		fetchProduct();
	}, []);

	const fetchProduct = () => {
		getProductInfo(slug)
			.then((res) => {
				setProduct({ ...product, ...res.data });
				/** Get Sub-Categories By CategoryId */
				if (res.data.category) {
					getSubsByParent(res.data.category._id, setSubCategories);
					setOriginalCategory(res.data.category._id);
				}
				/** Create Sub-Categories Array */
				if (res.data.subCategory.length > 0) {
					let subsArray = [];
					res.data.subCategory.map((sub) => {
						subsArray.push(sub._id);
					});
					setSubsIdArray((prev) => subsArray);
				}
			})
			.catch((error) => {
				console.log(error);
				errorNotify('Failed to get product!!!');
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		product.subCategory = subsIdArray;
		updateProduct(slug, product, admin.token)
			.then((res) => {
				successNotify(`"${res.data.title}" is updated!`);
				history.push('/admin/products');
			})
			.catch((error) => {
				errorNotify(error.response.data);
			});
		setIsSubmitted(true);
	};

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
		setIsSubmitted(false);
	};

	/** Show Sub Categories When Category Is Changed */
	const getSubsOnCategoryChange = (e) => {
		e.preventDefault();
		setProduct({ ...product, subCategory: [], category: e.target.value });
		getSubsByParent(e.target.value, setSubCategories);

		/** Show default selected sub-categories
		 * If Admin want to re-select the original category
		 */
		if (originalCategory === e.target.value) {
			fetchProduct();
		} else {
			setSubsIdArray([]);
		}

		setIsSubmitted(false);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Product Details</h4>
					<hr />
					<FileUpload
						value={product}
						setValue={setProduct}
						isSubmitted={isSubmitted}
					/>
					<ProductUpdateForm
						submitHandler={handleSubmit}
						onChangeHandler={handleChange}
						values={product}
						setValue={setProduct}
						categories={categories}
						subCategories={subCategories}
						onCategoryChange={getSubsOnCategoryChange}
						subsIdArray={subsIdArray}
						setSubsIdArray={setSubsIdArray}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
