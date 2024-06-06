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
import { getSingleProduct } from "@/store/features/products/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const [inputValues, setInputValues] = useState({});
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const catStatus = useSelector((state) => state.categories.status);
  const catError = useSelector((state) => state.categories.error);
  const prodStatus = useSelector((state) => state.categories.status);
  const prodError = useSelector((state) => state.categories.error);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleChange = () => {};
  const handleCategoryChange = () => {};
  useEffect(() => {
    dispatch(getSingleProduct(productId))
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(getAllCategories())
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId, dispatch]);

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
          <form encType="multipart/form-data">
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
                  <Select onValueChange={handleCategoryChange}>
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
