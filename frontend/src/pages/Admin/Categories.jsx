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
import {
  deleteCategory,
  getAllCategories,
} from "@/store/features/categories/categorySlice";
import { MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);
  const navigate = useNavigate();
  // delete category
  const handleDelete = (slug) => {
    dispatch(deleteCategory(slug))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response.message, { autoClose: 2000 });
          dispatch(getAllCategories());
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(getAllCategories());
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
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Link to="/admin/categories/add">
          <Button>Add Category</Button>
        </Link>
      </div>
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories &&
              categories.categories &&
              categories.categories.map((category, index) => {
                return (
                  <TableRow key={category._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="capitalize">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {moment(category.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
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
                                  `/admin/categories/update/${category.slug}`
                                );
                              }}
                            >
                              Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                handleDelete(category.slug);
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

export default Categories;
