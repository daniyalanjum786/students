import { useEffect } from "react";

function Users() {
  const getAllUsers = () => {};

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center"></div>
      </div>
    </>
  );
}

export default Users;
