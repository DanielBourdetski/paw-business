import ProductsTable from '../components/admin/ProductsTable';
import UsersTable from '../components/admin/UsersTable';

const Admin = () => {
	return (
		<>
			<UsersTable />
			<hr className='my-3' />
			<ProductsTable />
		</>
	);
};

export default Admin;
