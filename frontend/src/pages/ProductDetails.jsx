import { addToCart } from "@/store/features/cart/cartSlice";
import { getSingleProduct } from "@/store/features/products/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    category: "",
    picture: "",
    description: "",
  });
  const [quantity, setQuantity] = useState(1);
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    // For Getting Product Details - Product Collection
    dispatch(getSingleProduct(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (products && products.product) {
      setProductDetails(products.product);
      console.log(products.product);
    }
  }, [products]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Product Details...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>{error}</p>
      </div>
    );
  }

  const { title, price, category, picture, description } = productDetails;
  const pictureUrl = picture?.picture_url || "";
  const categoryName = category?.name || "";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId,
        title,
        price,
        pictureUrl,
        quantity,
      })
    );
    toast.success("Product added to cart successfully");
  };

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center text-4xl py-3 font-semibold">
          Product Details
        </h1>
        <div className="flex py-5">
          <div className="w-1/2">
            <img src={pictureUrl} alt={title} />
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl mb-3 font-semibold">{title}</h2>
            <p className="capitalize mb-3">
              Price: <span className="font-semibold">${price}</span>
            </p>
            <p className="capitalize mb-3">
              Category: <span className="font-semibold">{categoryName}</span>
            </p>
            <p className="capitalize mb-3">Description: {description}</p>
            <div className="flex items-center mb-3">
              <button
                onClick={handleDecrement}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                readOnly
                className="w-10 text-center"
              />
              <button
                onClick={handleIncrement}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
            <div className="grid ">
              <button
                className="bg-orange-400 py-3 rounded hover:bg-orange-500"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
