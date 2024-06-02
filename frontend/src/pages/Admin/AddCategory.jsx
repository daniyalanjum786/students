import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCategory } from "@/store/features/categories/categorySlice";
import { useNavigate } from "react-router-dom";
function AddCategory() {
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // sending data from frontend to backend
    dispatch(addCategory(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response.message, { autoClose: 2000 });
          navigate("/admin/categories");
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  return (
    <>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Category Name</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  className="me-2"
                  placeholder="Category Name"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange}
                />
                <Button type="submit">Add Category</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default AddCategory;
