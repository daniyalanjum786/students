import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <>
      <aside>
        <Sidebar />
      </aside>
      <section>
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
