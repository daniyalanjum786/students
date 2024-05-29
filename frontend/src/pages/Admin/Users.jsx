import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchAllUsers } from "@/store/features/users/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users); // Modify this line
  const status = useSelector((state) => state.users.status); // Modify this line
  const error = useSelector((state) => state.users.error); // Modify this line
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

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
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status == "success"
              ? users.users.map((user, index) => {
                  return (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === 0 ? "User" : "Admin"}
                      </TableCell>
                      <TableCell className="text-right">Actions</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Users;
