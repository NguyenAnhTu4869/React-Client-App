import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_USER } from './reducers/actions/types';

import { auth } from './services/fire-base/firebase';
import { useDispatch } from 'react-redux';
import { checkCurrentUser } from './services/auth-service';
import { errorNotify } from './components/modal/ToastNotification';
import { LoadingOutlined } from '@ant-design/icons';

const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/navigation/Header'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import('./pages/user/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubCategoryCreate = lazy(() => import('./pages/admin/sub/SubCategoryCreate'));
const SubCategoryUpdate = lazy(() => import('./pages/admin/sub/SubCategoryUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const Products = lazy(() => import('./pages/admin/product/Products'));
const ProductDetails = lazy(() => import('./pages/admin/product/ProductDetails'));
const SingleProduct = lazy(() => import('./pages/SingleProduct'));
const CategoryPage = lazy(() => import('./pages/category/CategoryPage'));
const SubCategoryPage = lazy(() => import('./pages/sub-category/SubCategoryPage'));
const ShopSearch = lazy(() => import('./pages/ShopSearch'));
const CartPage = lazy(() => import('./pages/cart/CartPage'));
const CheckOut = lazy(() => import('./pages/payment/CheckOut'));
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/payment/Payment'));

const App = () => {
	const dispatch = useDispatch();

	// to check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				checkCurrentUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: LOGIN_USER,
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								address: res.data.address,
								_id: res.data._id,
							},
						});
					})
					.catch((error) => errorNotify(error.error));
			}
		});
		// cleanup
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<Suspense
			fallback={
				<div className='col text-center pt-5 display-4'>
					<div className='text-danger'>
						<b>
							~~ WELCOME TO TECHSHOP EC
							<LoadingOutlined />
							MMERCE ~~
						</b>
					</div>
				</div>
			}>
			<Header />
			<SideDrawer />
			<ToastContainer transition={Zoom} />
			<Switch>
				<Route
					exact
					path='/'
					component={Home}
				/>
				<Route
					exact
					path='/login'
					component={Login}
				/>
				<Route
					exact
					path='/register'
					component={Register}
				/>
				<Route
					exact
					path='/register/complete'
					component={RegisterComplete}
				/>
				<Route
					exact
					path='/forgot/password'
					component={ForgotPassword}
				/>
				<Route
					exact
					path='/product/:slug'
					component={SingleProduct}
				/>
				<Route
					exact
					path='/category/:slug'
					component={CategoryPage}
				/>
				<Route
					exact
					path='/sub-category/:slug'
					component={SubCategoryPage}
				/>
				<Route
					exact
					path={['/shop', '/shop/search']}
					component={ShopSearch}
				/>
				<Route
					exact
					path='/cart'
					component={CartPage}
				/>
				(/** Protect User Route */)
				<UserRoute
					exact
					path='/user/history'
					component={History}
				/>
				<UserRoute
					exact
					path='/user/password'
					component={Password}
				/>
				<UserRoute
					exact
					path='/user/wishlist'
					component={Wishlist}
				/>
				<UserRoute
					exact
					path='/user/checkout'
					component={CheckOut}
				/>
				<UserRoute
					exact
					path='/user/payment'
					component={Payment}
				/>
				(/** Protect Admin Route */)
				<AdminRoute
					exact
					path='/admin/dashboard'
					component={AdminDashboard}
				/>
				<AdminRoute
					exact
					path='/admin/category'
					component={CategoryCreate}
				/>
				<AdminRoute
					exact
					path='/admin/category-update/:slug'
					component={CategoryUpdate}
				/>
				<AdminRoute
					exact
					path='/admin/sub-category'
					component={SubCategoryCreate}
				/>
				<AdminRoute
					exact
					path='/admin/sub-category-update/:slug'
					component={SubCategoryUpdate}
				/>
				<AdminRoute
					exact
					path='/admin/create-product'
					component={ProductCreate}
				/>
				<AdminRoute
					exact
					path='/admin/products'
					component={Products}
				/>
				<AdminRoute
					exact
					path='/admin/product/:slug'
					component={ProductDetails}
				/>
				<AdminRoute
					exact
					path='/admin/coupon'
					component={CreateCoupon}
				/>
				<AdminRoute
					exact
					path='/user/payment'
					component={Payment}
				/>
			</Switch>
		</Suspense>
	);
};

export default App;
