import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProduct,
  getAllProducts,
} from "@/store/features/products/productsSlice";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const navigate = useNavigate();
  // delete product
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response.message, { autoClose: 2000 });
          dispatch(getAllProducts());
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, navigate]);

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
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <Link to="/admin/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. #</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.products &&
              products.products.map((product, index) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.picture.picture_url}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.title}
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {moment(product.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{product.user.name}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                navigate(
                                  `/admin/products/update/${product._id}`
                                );
                              }}
                            >
                              Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                handleDelete(product._id);
                              }}
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}

export default Products;
