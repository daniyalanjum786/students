import { Link, useNavigate } from "react-router-dom";

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
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/features/auth/authSlice";

export default function RegisterPage() {
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // sending data from frontend to backend
    dispatch(register(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response.message, { autoClose: 2000 });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="John Doe"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={inputValues.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  name="password"
                  value={inputValues.password || ""}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={status == "loading" ? true : false}
              >
                {status == "loading"
                  ? "Creating Your Account..."
                  : "Create an account"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
