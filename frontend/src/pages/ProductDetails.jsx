import { getSingleProduct } from "@/store/features/products/productsSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

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

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center text-4xl py-3 font-semibold">
          Product Details
        </h1>
        <div className="flex py-5">
          <div className="w-1/2">
            <img
              src={productDetails.picture.picture_url}
              alt={productDetails.title}
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl mb-3 font-semibold">
              {productDetails.title}
            </h2>
            <p className="capitalize mb-3">
              Price:{" "}
              <span className="font-semibold">${productDetails.price}</span>
            </p>
            <p className="capitalize mb-3">
              Category:{" "}
              <span className="font-semibold">
                {productDetails.category.name}
              </span>
            </p>
            <p className="capitalize">
              Description: {productDetails.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
