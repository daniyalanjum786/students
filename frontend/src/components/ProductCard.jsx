import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <Card className="rounded-lg shadow w-full">
          <CardContent className="grid gap-4">
            <img
              className="px-8 py-4 rounded-t-lg"
              src={product.picture.picture_url}
              alt={product.title}
            />
            <div className="px-3 pb-5">
              <h5 className="text-2xl mb-4 font-semibold tracking-tight text-gray-900">
                {product.title}
              </h5>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <button className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Add to cart
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

export default ProductCard;
