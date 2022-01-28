import Dashboard from '../content/dashboard/';
import Users from '../content/users_manager/';
import Products from '../content/products_manager/stock';
import Sales from '../content/products_manager/index';

const Routes =
{
	dashboard: {
		name: 'dashboard',
		caption: 'Dashboard',
		component: Dashboard,
		bbox: 'Body-content'
	},
	users: {
		name: 'users',
		caption: 'Users',
		component: Users,
		bbox: 'Body-content'
	},
	products: {
		name: 'products',
		caption: 'Products',
		component: Products,
		bbox: 'Body-content'
	},
	sales: {
		name: 'sales',
		caption: 'Sales',
		component: Sales,
		bbox: 'Body-content'
	}
}

export default Routes;