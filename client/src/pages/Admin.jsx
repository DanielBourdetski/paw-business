import ProductsTable from "../components/admin/ProductsTable";
import UsersInfo from "../components/admin/UsersInfo";

const Admin = () => {
  return (
    <>
      <h2 className="text-4xl md:text-5xl text-center mb-4 mt-10">
        Admin Panel
      </h2>
      <UsersInfo />
      <hr className="my-3" />
      <ProductsTable />
    </>
  );
};

export default Admin;
