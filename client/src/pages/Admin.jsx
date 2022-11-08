import ProductsTable from '../components/ProductsTable';
import UsersTable from '../components/UsersTable';

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
