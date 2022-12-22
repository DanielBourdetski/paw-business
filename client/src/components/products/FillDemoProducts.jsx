import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../store/store";

const FillDemoProducts = ({ onGenerateProducts }) => {
  const [boxOpen, setBoxOpen] = useState(true);
  const promptClosed = useSelector((state) => state.general.promptClosed);

  const dispatch = useDispatch();

  const closeBox = () => {
    dispatch(generalActions.closePrompt());
    setBoxOpen(false);
  };

  if (!boxOpen || promptClosed) return null;

  return (
    <div className="absolute w-80 h-48 flex flex-col items-center justify-evenly bg-slate-300 z-10 p-4 top-1/3 left-1/2 -translate-x-1/2 border rounded shadow-lg shadow-slate-400">
      <h3 className="text-xl">
        Would you like to fill the store with randomly generated demo products?
      </h3>
      <div className="flex gap-x-4">
        <button
          className="p-1 border border-slate-400 rounded"
          onClick={() => {
            onGenerateProducts();
            closeBox();
          }}
        >
          Generate Products
        </button>
        <button
          className="p-1 border border-slate-400 rounded"
          onClick={closeBox}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FillDemoProducts;
