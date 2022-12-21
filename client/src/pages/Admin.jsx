import ProductsTable from '../components/admin/ProductsTable';
import UsersInfo from '../components/admin/UsersInfo';

const Admin = () => {
	return (
		<>
			<UsersInfo />
			<hr className='my-3' />
			<ProductsTable />
		</>
	);
};

export default Admin;
