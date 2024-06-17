import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories } from "@/store/features/categories/categorySlice";
import {
  getSingleProduct,
  updateProduct,
} from "@/store/features/products/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    category: "",
    picture: "",
    description: "",
  });
  const categories = useSelector((state) => state.categories.categories);
  const catStatus = useSelector((state) => state.categories.status);
  const catError = useSelector((state) => state.categories.error);
  const products = useSelector((state) => state.products.products);
  const prodStatus = useSelector((state) => state.products.status);
  const prodError = useSelector((state) => state.products.error);
  const { productId } = useParams();
  const [prevPic, setPrevPic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setInputValues((values) => ({
      ...values,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleCategoryChange = (value) => {
    setInputValues((values) => ({ ...values, category: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValues);
    dispatch(updateProduct({ inputValues, productId }))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response.message, { autoClose: 2000 });
          navigate("/admin/products");
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    // For Getting Product Details - Product Collection
    dispatch(getSingleProduct(productId));
    // For Getting Category Details - Category Collection
    dispatch(getAllCategories());
  }, [productId, dispatch]);

  useEffect(() => {
    if (products && products.product) {
      const { title, price, category, picture, description } = products.product;
      setInputValues({
        title: title,
        price: price,
        category: category,
        picture: picture.picture_url,
        description: description,
      });
      setPrevPic(picture.picture_url);
    }
  }, [products]);

  if (catStatus === "loading" || prodStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (catError === "failed" || prodError === "failed") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Category: {catError}</p>
        <p>Product: {prodError}</p>
      </div>
    );
  }
  return (
    <>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter Product Title"
                  required
                  name="title"
                  value={inputValues.title || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter Product Price"
                    required
                    name="price"
                    value={inputValues.price || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={inputValues.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        category
                        {categories &&
                          categories.categories &&
                          categories.categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="picture">Product Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    required
                    name="picture"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "picture",
                          value: e.target.files[0],
                        },
                      })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="picture"> Previous Picture</Label>
                  <img
                    src={prevPic}
                    className="aspect-square rounded-md object-cover"
                    height="100"
                    width="100"
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-32"
                  placeholder="Enter Product Description"
                  name="description"
                  required
                  value={inputValues.description || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  // className="w-full"
                  // disabled={status == "loading" ? true : false}
                >
                  {/* {status == "loading" ? "Adding Product..." : "Add Product"} */}
                  Add Product
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdateProduct;
