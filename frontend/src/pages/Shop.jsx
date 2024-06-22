import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/store/features/products/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Shop() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading users...</p>
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
        <h1 className="text-3xl font-semibold text-center py-5">Products</h1>
        <div className="grid grid-cols-4 gap-4">
          {products &&
            products.products &&
            products.products.map((product) => {
              return (
                <div key={product._id} className="mb-3">
                  <ProductCard product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Shop;
