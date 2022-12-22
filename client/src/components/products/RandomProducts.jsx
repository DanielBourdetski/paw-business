import { useEffect } from "react";
import { useState } from "react";
import productService from "../../services/productService";
import ProductList from "./ProductList";
import useHandleError from "../../hooks/useHandleError";
import useLoader from "../../hooks/useLoader";
import NoProductsInStore from "./NoProductsInStore";

const getRandomIndex = (limit) => Math.floor(Math.random() * (limit - 0.5));
const defaultNumberOfProducts = 8;

const RandomProducts = ({
  reloadIfGeneratedProducts,
  openGenerateProductsPrompt,
}) => {
  const [products, setProducts] = useState([]);

  const handleError = useHandleError();
  const { startLoading, stopLoading, loaded } = useLoader();

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        startLoading();
        const allProducts = await productService.getAllProducts();

        if (!allProducts.length) openGenerateProductsPrompt();

        if (allProducts.length < defaultNumberOfProducts) {
          setProducts(allProducts);
          return;
        }

        let randomProducts = [];

        for (let x = 0; x < defaultNumberOfProducts; x++) {
          let randomIndex = getRandomIndex(allProducts.length);

          while (
            randomProducts.some((p) => p._id === allProducts[randomIndex]._id)
          ) {
            randomIndex = getRandomIndex(allProducts.length);
          }
          randomProducts.push(allProducts[randomIndex]);
        }
        setProducts(randomProducts);
      } catch (err) {
        handleError(err, "get popular products");
      } finally {
        stopLoading();
      }
    };

    fetchRandomProducts();
  }, [reloadIfGeneratedProducts]);

  if (!loaded) return null;

  if (!products || !products.length) return <NoProductsInStore />;

  return <ProductList products={products} title="Recommended" />;
};

export default RandomProducts;
