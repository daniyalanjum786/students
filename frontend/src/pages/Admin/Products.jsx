import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Products() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <Link to="/admin/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>
    </>
  );
}

export default Products;
