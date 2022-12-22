import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartAndFavs from "../components/CartAndFavs";
import FillDemoProducts from "../components/products/FillDemoProducts";
import RandomProducts from "../components/products/RandomProducts";
import { generateRandomProducts } from "../config/productRandomizer";
import useHandleError from "../hooks/useHandleError";
import useLoader from "../hooks/useLoader";
import { sendRandomProducts } from "../services/userService";

const Home = () => {
  const [isGeneratePromptOpen, setGeneratePromptOpen] = useState(false);
  const [generatedNewProducts, setGeneratedNewProducts] = useState(false);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const handleError = useHandleError();
  const { startLoading, stopLoading } = useLoader();

  const openPrompt = () => setGeneratePromptOpen(true);

  const onGenerateProducts = async () => {
    const randomProducts = generateRandomProducts(30);
    try {
      startLoading();
      await sendRandomProducts(randomProducts);
      setGeneratedNewProducts(true);
    } catch (err) {
      handleError(err, "post random products");
    } finally {
      stopLoading();
    }
  };

  if (!token) return navigate("/login");

  return (
    <>
      {isGeneratePromptOpen && (
        <FillDemoProducts onGenerateProducts={onGenerateProducts} />
      )}
      <RandomProducts
        openGenerateProductsPrompt={openPrompt}
        reloadIfGeneratedProducts={generatedNewProducts}
      />
      <CartAndFavs />
    </>
  );
};

export default Home;
