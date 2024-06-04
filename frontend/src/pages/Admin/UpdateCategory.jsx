import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCategory,
  updateCategory,
} from "@/store/features/categories/categorySlice";
function UpdateCategory() {
  const [catName, setCatName] = useState(null);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // sending data from frontend to backend
    dispatch(updateCategory({ name: catName, slug: slug }))
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
  useEffect(() => {
    dispatch(getSingleCategory(slug))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          setCatName(response.category?.name);
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  }, [dispatch, slug]);

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
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                  }}
                />
                <Button type="submit">Update Category</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default UpdateCategory;
