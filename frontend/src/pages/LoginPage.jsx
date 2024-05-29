import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [inputValues, setInputValues] = useState({});
  const { status } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // sending data from frontend to backend
    dispatch(login(inputValues))
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
      <Card className="w-full max-w-sm  py-5">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
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
                required
                name="password"
                value={inputValues.password || ""}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={status == "loading" ? true : false}
            >
              {status == "loading" ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
        <div className="text-center text-sm">
          Do not have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  );
}
