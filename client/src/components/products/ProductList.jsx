import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = ({ products, title = "", className }) => {
  const { cart, favorites = [] } = useSelector((state) => state.user);
  const cartIds = cart.map((p) => p.product);

  const capitalizedTitle =
    title.slice(0, 1).toUpperCase() + title.slice(1).toLowerCase();

  if (!products || !products.length)
    return (
      <div className="text-center mb-8">
        {capitalizedTitle && (
          <h2 className="text-3xl italic underline">{capitalizedTitle}</h2>
        )}
        <p>Seems there are no products in this category yet.</p>
      </div>
    );

  return (
    <>
      {capitalizedTitle && (
        <h2 className="text-center text-3xl italic underline">
          {capitalizedTitle}
        </h2>
      )}
      <ul
        className={`list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 my-4 w-full ${className}`}
      >
        {products.map((p) => {
          if (!p) return null;
          return (
            <ProductCard
              key={p._id}
              info={p}
              className=""
              inCart={cartIds.includes(p._id)}
              favorite={favorites.includes(p._id)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ProductList;
