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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function AddProduct() {
  const [inputValues, setInputValues] = useState({});
  // const { status } = useSelector((state) => state.auth);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValues);
    // sending data from frontend to backend
    // dispatch(login(inputValues))
    //   .unwrap()
    //   .then((response) => {
    //     if (response?.success == true) {
    //       toast.success(response.message, { autoClose: 2000 });
    //       setTimeout(() => {
    //         navigate("/");
    //       }, 2000);
    //     } else {
    //       toast.error(response.message, { autoClose: 2000 });
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error(error, { autoClose: 2000 });
    //   });
  };
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
          <form onSubmit={handleSubmit}>
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
                  <Input
                    id="category"
                    type="text"
                    placeholder="Enter Product Category"
                    required
                    name="category"
                    value={inputValues.category || ""}
                    onChange={handleChange}
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

export default AddProduct;
